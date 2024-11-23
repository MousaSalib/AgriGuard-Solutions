export interface createProductsDTO {
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
}

export interface updateProductDTO {
  title?: string;
  description?: string;
  category?: string;
  price?: number;
  stock?: number;
}

export interface registerUserDTO {
  username: string;
  email: string;
  password: string;
}

export interface loginUserDTO {
  email: string;
  password: string;
}

export interface updateUserDTO {
  username?: string;
  email?: string;
  password?: string;
}

export interface createNewCommentDTO {
  text: string;
  productId: number;
}

export interface updateCommentDTO {
  text?: string;
}
