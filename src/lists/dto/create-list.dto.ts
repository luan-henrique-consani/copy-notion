import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateListDto {
    @IsString()
    title: string;

    @IsInt()
    boardId: number;

    @IsInt()
    @IsOptional()
    position?: number;
}
