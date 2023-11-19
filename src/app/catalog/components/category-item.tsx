import { Category } from "@prisma/client"
import Image from "next/image"
import Link from "next/link"

interface CategoryItemProps{
    category: Category
}

const CategoryItem = ({category}: CategoryItemProps) => {
  return (
    <Link href={`/category/${category.slug}`}>

        <div className="flex flex-col">

            <div className="w-full flex h-[´150px] w-full items-center justify-center bg-category-item-gradient rounded-tl-lg rounded-tr-lg">
                <Image
                    src={category.imageUrl}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-auto w-auto max-w-[80%] max-h-[70%]"
                    style={{objectFit: "contain"}}
                    alt={category.name}
                />
            </div>

            <div className="bg-accent py-2 rounded-br-lg rounded-bl-lg">
                <p className="text-sm font-semibold">{category.name}</p>
            </div>



        </div>
    </Link>
  )
}

export default CategoryItem