interface ColorDTO {
    color_name: string;
  }
  
  interface SectionDTO {
    section_name: string;
  }
  
  interface SizeAmountDTO {
    size_amount: number;
    size: string;
  }
  
  interface ProductDTO {
    [key: string]: any;
    value: number;
    color: ColorDTO;
    description: string;
    section: SectionDTO;
    size_amount: SizeAmountDTO;
    image?: File | null;
  }
  
  interface BrandDTO {
    brand: string;
  }
  
  interface GeneralProductDTO {
    general_product_name: string;
    brand: BrandDTO;
    products: ProductDTO[];
  }


  