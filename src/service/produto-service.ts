import { Produto } from "../model/produto";
import { ProdutoRepository } from "../repository/produto-repository";

export class ProdutoService {
    private repository: ProdutoRepository;

    constructor(repository: ProdutoRepository){
        this.repository = repository;
    }

    async inserir(produto: Produto): Promise<Produto> {
        if(!produto || !produto.nome || produto.preco) {
            throw({id:400, msg: "Falta dados obrigatorios de produto"});            
        }
        return await this.repository.inserir(produto);
    }

    async listar(): Promise<Produto[]> {
        return await this.repository.listar();
    }

    async buscarPorId(id: number): Promise<Produto> {
        let produto = await this.repository.buscarPorId(id);
        if(!produto) {
            throw({id: 404, msg:"Produto nao encontrado!"})
        }
        return produto;
    }
}