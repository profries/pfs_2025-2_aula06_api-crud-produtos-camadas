import { Produto } from "../model/produto";
import pool from "./bd";

export class ProdutoRepository {

    async inserir(produto: Omit<Produto, 'id'>): Promise<Produto> {
        const cliente = await pool.connect();

        const sql = `INSERT INTO produtos(nome, preco) VALUES ($1, $2) RETURNING *`;

        const resultado = await cliente.query(sql, [produto.nome, produto.preco]);
        cliente.release();

        return resultado.rows[0];
    }

    async listar(): Promise<Produto[]> {
        const cliente = await pool.connect();
        const sql = `SELECT * FROM PRODUTOS`;

        const resultado = await cliente.query(sql);
        cliente.release();

        return resultado.rows;
    }

    async buscarPorId(id: number): Promise<Produto> {
        const cliente = await pool.connect();
        const sql = `SELECT * FROM PRODUTOS WHERE id=$1`;

        const resultado = await cliente.query(sql, [id]);
        cliente.release();

        return resultado.rows[0];
    }

}