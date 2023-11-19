"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import DiscountBadge from "@/components/ui/discounts-badge"
import { ProductWithTotalPrice } from "@/helpers/product"
import { CartContext } from "@/providers/cart"
import { ArrowDownIcon, ArrowLeftIcon, ArrowRightIcon, TruckIcon } from "lucide-react"
import { useContext, useState } from "react"

interface ProductInfoProps{
    product: ProductWithTotalPrice
}


const ProductInfo = ({product}: ProductInfoProps) => {
    const [quantity, setQuantity] = useState(1)

    const { addProductToCart } = useContext(CartContext)

    const handleDecreaseQuantityClick = () => {
        setQuantity((prev) => (prev === 1 ? prev : prev -1))
    }

    const handleIncreaseQuantityClick = () => {
        setQuantity((prev) => (prev  +1))
    }

    const handleAddToCartClick = () =>{
      addProductToCart({...product, quantity})
    }

    
  return (
    <div className="flex flex-col px-5">
        <h2 className="text-2xl font-bold">{product.name}</h2>
        
        <div className="flex items-center gap-2">
            <h1>R$ {product.totalPrice.toFixed(2)}</h1>
             {product.discountPercentage > 0 && (
              <DiscountBadge>
                <ArrowDownIcon size={14}/> {product.discountPercentage} 
              </DiscountBadge>   
        )}
        </div>

            {product.discountPercentage > 0 && 
                <p className="opacity-75 text-sm line-through">
                    R$ {Number(product.basePrice).toFixed(2)}
                </p>}

          <div className="flex items-center gap-2"> 
            <Button size="icon" variant="outline" onClick={handleDecreaseQuantityClick}>
                <ArrowLeftIcon size={16}/>
            </Button>

                <span>{quantity}</span>

            <Button size="icon" variant="outline" onClick={handleIncreaseQuantityClick}>
                <ArrowRightIcon size={16}/>
            </Button>
          </div>   

          <div className="flex-flex-col gap-3 mt-8">
            <h3 className="font-bold">Descrição</h3>
            <p className="text-sm opacity-60 text-justify">{product.description}</p>
          </div>   

          <Button className="mt-8 uppercase font-bold" onClick={handleAddToCartClick}>
            Adicionar ao carrinho
          </Button>

          <div className="bg accent-current flex items-center px-5 py-2 justify-between mt-5">
            <div className="flex items-center gap-2">
              <TruckIcon/>
        
            <div className="flex flex-col">
                <p className="text-xs">Entrega via <span className="font-bold">FSPacket</span></p>
                <p className="text-[#b162ff] text-xs">Envio para <span className="font-bold">todo o Brasil</span></p>
            </div>  

            </div>

            <p className="font-bold">Frete grátis</p>
          </div>
    </div>
  )
}

export default ProductInfo