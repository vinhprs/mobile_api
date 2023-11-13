import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from "class-validator";

export class CheckoutCartDto {
    @IsNotEmpty()
    @IsArray()
    @IsNumber({}, {each: true})
    @ArrayMinSize(1)
    cartIds: number[];

    @IsNotEmpty()
    @IsNumber()
    total: number;
}
