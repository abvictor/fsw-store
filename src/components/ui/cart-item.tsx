import { CartContext, CartProduct } from "@/providers/cart";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from 'next/image'
import { Button } from "./button";
import { useContext } from "react";


interface CartItemProps{
    product: CartProduct;
}

const CartItem = ({product}: CartItemProps) => {

    const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } = useContext(CartContext)


    const handleDecreaseProductQuantity = () =>{
       decreaseProductQuantity(product.id) 
    }

    const handleIncreaseProductQuantity = () =>{
        increaseProductQuantity(product.id) 
     }


     const handleRemoveProductFromCart = () =>{
        removeProductFromCart(product.id)
     }


  return (
    <div className="flex items-center justify-between">
        
        <div className="flex items-center gap-4">
            <div className="bg-accent flex items-center justify-items-center rounded-lg h-[77px] w-[77px] ">
                <Image 
                    src={product.imageUrls[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt={product.name}
                    className="h-auto max-h-[70%] w-auto max-w-[80%]"
                />
            </div>

        <div className="flex flex-col">
            <p className="text-xs">{product.name}</p>
                <div className="flex iotems-center gap-2">
                    <p className="text-sm font-bold">{product.totalPrice.toFixed(2)}</p>  
                    {product.discountPercentage > 0 && (
                        <p className="opacity-75 line-through text-xs">{Number(product.basePrice).toFixed(2)}</p>
                    )}  
                </div>

                
            <div className="flex items-center gap-2"> 
                <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleDecreaseProductQuantity}>
                    <ArrowLeftIcon size={16}/>
                </Button>

                    <span className="text-xs">{product.quantity}</span>

                <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleIncreaseProductQuantity}>
                    <ArrowRightIcon size={16}/>
                </Button>
            </div>   
        </div> 
    </div>
         <Button size="icon" variant="outline" onClick={handleRemoveProductFromCart}>
            <TrashIcon size={16}/>
         </Button>
</div>
  )
}

export default CartItem