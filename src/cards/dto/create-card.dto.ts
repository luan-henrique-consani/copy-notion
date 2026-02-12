import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateCardDto {
    @IsString()
    title: string;

    @IsString()
    description: string;

    @IsInt()
    @IsOptional()
    position?: number;

    @IsInt()
    listId: number;
}
