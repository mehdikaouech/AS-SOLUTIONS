import Condition from '../models/Condition';
import Operation from '../models/Operation';
import Product from '../models/Product';
import Rule from '../models/Rule';

// Service pour créer un produit avec des règles, conditions et opérations
class ProductService {

  public async getProductWithRules(productId: string) {
    const product = await Product.findOne({
        where: { id: productId }, 
        include: [
            {
                model: Rule,
                include: [
                    {
                        model: Condition,
                        required: true, 
                    },
                    {
                        model: Operation,
                        required: true, 
                    }
                ]
            }
        ]
    });

    if (!product) {
        throw new Error('Produit non trouvé');
    }

    return product;
}

public async calculateQuote(productId: string, customerData: any) {

  const product = await Product.findOne({
    where: { id: productId },
    include: {
      model: Rule,
      include: [Condition, Operation],
    },
  });

  if (!product) {
    throw new Error("Produit non trouvé");
  }

  let finalPrice = product.basePrice;
  console.log(`Base price: ${finalPrice}`);

  for (const rule of product.rules) {
    let ruleMatches = true; 

    for (const condition of rule.conditionsData) {
      const customerValue = customerData[condition.field]; 
      let conditionValue: number | string | boolean = condition.value; 
      let conditionMet = false;
  
      if (typeof conditionValue === "string") {
        const parsedValue = parseFloat(conditionValue);
        if (!isNaN(parsedValue)) {
          conditionValue = parsedValue;
        }
      }
  
      switch (condition.operator) {
        case "<":
          if (typeof customerValue === "number" && typeof conditionValue === "number") {
            conditionMet = customerValue < conditionValue;
          }
          break;
        case ">":
          if (typeof customerValue === "number" && typeof conditionValue === "number") {
            conditionMet = customerValue > conditionValue;
          }
          break;
        case "<=":
          if (typeof customerValue === "number" && typeof conditionValue === "number") {
            conditionMet = customerValue <= conditionValue;
          }
          break;
        case ">=":
          if (typeof customerValue === "number" && typeof conditionValue === "number") {
            conditionMet = customerValue >= conditionValue;
          }
          break;
        case "==":
          if (typeof conditionValue === "string" && typeof customerValue === "string") {
            conditionMet = customerValue.trim().toLowerCase() === conditionValue.trim().toLowerCase();
          } else {
            conditionMet = customerValue == conditionValue;
          }
          break;
        default:
          throw new Error(`Opérateur non pris en charge: ${condition.operator}`);
      }
      
  
      console.log(`Condition met: ${conditionMet}`);
  
      if (condition.type === "AND" && !conditionMet) {
        ruleMatches = false;
        break; 
      }
      if (condition.type === "OR" && conditionMet) {
        ruleMatches = true;
        break; 
      }
      
      if (condition.type === "OR" && !conditionMet && ruleMatches) {
        ruleMatches = false; 
      }
    }
  
    if (ruleMatches) {
      for (const operation of rule.operationsData) {
        const operationValue = parseFloat(String(operation.value)); 
        if (isNaN(operationValue)) {
          throw new Error(
            `Valeur d'opération invalide: ${operation.value} pour l'opération ${operation.operator}`
          );
        }

        switch (operation.operator) {
          case "+":
            finalPrice += operationValue;
            break;
          case "-":
            finalPrice -= operationValue;
            break;
          default:
            throw new Error(`Opérateur d'opération non pris en charge: ${operation.operator}`);
        }
      }
      
    }
  }

  finalPrice = Math.max(0, finalPrice);
  console.log(`Final price: ${finalPrice}`);

  return { finalPrice };
}

  public async createProductWithRules(data: {
    basePrice: number;
    rules: {
      conditions: any[];
      operation: any;
    }[];
  }) {
    const { basePrice, rules } = data;

    const product = await Product.create({ basePrice });

    for (const ruleData of rules) {

      const rule = await Rule.create({
        productId: product.id,
        conditions: ruleData.conditions,
        operation: ruleData.operation,
      });


      for (const conditionData of ruleData.conditions) {
        await Condition.create({
          ruleId: rule.id,
          field: conditionData.field,
          operator: conditionData.operator,
          value: conditionData.value,
          type: conditionData.type || null,
        });
      }

      await Operation.create({
        ruleId: rule.id,
        field: ruleData.operation.field,
        operator: ruleData.operation.operator,
        value: ruleData.operation.value,
      });
    }

    return product;
  }
}

export default new ProductService();
