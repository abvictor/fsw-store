import { Badge } from "@/components/ui/badge"
import { ProductItem } from "@/components/ui/product-item"
import { CATEGORY_ICON } from "@/constants/category-icons"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"

const CategoryProducts = async ({params}: any) => {

  const category = await prismaClient.category.findFirst({
    where: {
      slug: params.slug,
    },
    include:{
      products: true
    }
  })

  if(!category){
    return null;
  }

  const products = await prismaClient.product.findMany({
    where: {
      category:{
        slug: params.slug
      }
    }
  })

  return (

    <div className="p-5 flex flex-col gap-8">
      <Badge className="gap-1 text-base uppercase border-2 border-primary px-3 py-[0.375rem]" variant="outline" >
      {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
            <span className="text-xs font-bold">{category.name}</span>   
      </Badge>

      <div className="grid grid-cols-2-gap-8">
        {products.map(product => <ProductItem key={product.id} product={computeProductTotalPrice(product)}/>)}
      </div>
    </div>

    )
}

export default CategoryProducts