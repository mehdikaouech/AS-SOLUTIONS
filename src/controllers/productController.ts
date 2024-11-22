import { Request, Response } from 'express';
import ProductService from '../services/pricingEngineService';


const isValidUUID = (uuid: string) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
};


class ProductController {

  public async getProduct(req: Request, res: Response): Promise<void> {
    try {
        const { productId } = req.params;

        if (!isValidUUID(productId)) {
            res.status(400).json({ message: 'ID de produit invalide' });
            return;
        }

        const product = await ProductService.getProductWithRules(productId);

        if (!product) {
            res.status(404).json({ message: 'Produit non trouvé' });
            return;
        }

        res.status(200).json(product);
    } catch (error) {
        console.error('Erreur lors de la récupération du produit:', error);
        res.status(500).json({ message: 'Erreur interne du serveur' });
    }
}


  
public async calculateQuote(req: Request, res: Response): Promise<void> {
  try {
      const { productId } = req.params;
      const userData = req.body; 

      // Valider que les données utilisateur sont présentes
      if (!userData || Object.keys(userData).length === 0) {
          res.status(400).json({ message: 'Données utilisateur manquantes' });
          return;
      }

      const finalPrice = await ProductService.calculateQuote(productId, userData);

      res.status(200).json({ finalPrice });
  } catch (error) {
      console.error('Erreur lors du calcul du quote:', error);
      res.status(500).json({ message: 'Erreur interne du serveur' });
  }
}

    

    public async createProduct(req: Request, res: Response): Promise<void> {
        try {
            const { basePrice, rules } = req.body;

            // Valider les données d'entrée
            if (typeof basePrice !== 'number' || !Array.isArray(rules)) {
                res.status(400).json({ message: 'Données invalides' });
                return;
            }

            const product = await ProductService.createProductWithRules({ basePrice, rules });
            res.status(200).json({
              id: product.id,
              basePrice: product.basePrice,
              rules:rules,
          });
     
        } catch (error) {
            console.error('Erreur lors de la création du produit:', error);
            res.status(500).json({ message: 'Erreur interne du serveur' });
        }
    }

    

  
    
}

export default new ProductController();
