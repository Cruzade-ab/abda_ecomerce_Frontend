interface ColorDTO {
    color_id: number;
    color_name: string;
  }
  
  interface SectionDTO {
    section_id: number;
    section_name: string;
  }
  
  interface SizeAmountDTO {
    size_amount_id: number;
    size_amount: number;
    size: string;
  }
  
  interface ProductDTO {
    product_id: number;
    value: number;
    color: ColorDTO;
    description: string;
    section: SectionDTO;
    image_url: string;
    imageFile?: File;
    size_amount: SizeAmountDTO;
  }
  
  interface BrandDTO {
    brand_id: number;
    brand_name: string;
  }
  
  interface GeneralProductDTO {
    general_product_id: number;
    general_product_name: string;
    brand: BrandDTO;
    products: ProductDTO[];
  }
  