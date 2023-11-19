import { ProductWithTotalPrice } from "@/helpers/product";

import Image from 'next/image'
import { Badge } from "./badge";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";

interface ProductItemProps{
    product: ProductWithTotalPrice;
}


export const ProductItem = ({product}:ProductItemProps) => {
  return (
    <Link href={`/product/${product.slug}`}>
    <div className="flex flex-col gap-4 max-w-[170px]">
      <div className="relative flex bg-accent rounded-lg h-[170px] w-full items-center justify-center">
        
        <Image
            src={product.imageUrls[0]}
            height={0}
            width={0}
            sizes="100vw"
             className="h-auto w-auto max-w-[80%] max-h-[70%]"
             style={{objectFit: "contain"}}
             alt={product.name}
        />

        {product.discountPercentage > 0 && (
          <Badge className="absolute left-3 top-3">
            <ArrowDownIcon size={14}/>{product.discountPercentage}%
           </Badge>
         )}
      </div>

      <div className="flex flex-col gap-1">

          <p className="overflow-hidden whitespace-nowrap text-ellipsis text-sm font-semibold">{product.name}</p>


          <div className="flex items-center gap-2">
            <p>{product.discountPercentage > 0 ? (
              <>
                <p className="font-semibold">R${Number(product.totalPrice).toFixed(2)}</p>
                <p className="opacity-75 line-through text-xs">R${Number(product.basePrice).toFixed(2)}</p>
              </>
            ): (
                <p className="text-sm font-semibold">R${Number(product.basePrice).toFixed(2)}</p>
            )}</p> 
          </div>
      </div>

    </div>
    </Link>
    )
}
