import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produto } from '../model/produto';
import { Item } from '../model/item';
import { Cesta } from '../model/cesta';
@Component({
  selector: 'app-vitrine',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './vitrine.component.html',
  styleUrl: './vitrine.component.css'
})
export class VitrineComponent {
  public mensagem: string = "conheça as nossas promoções";
  public lista: Produto[] = [
    {codigo: 1, nome: "Camiseta Básica", descritivo: "Camiseta 100% algodão", valor: 25.00, quantidade: 50, keywords: "camisetas, roupas casuais"},
    {codigo: 2, nome: "Calça Jeans", descritivo: "Calça jeans azul escuro", valor: 90.00, quantidade: 40, keywords: "calças, jeans, roupas casuais"},
    {codigo: 3, nome: "Jaqueta de Couro", descritivo: "Jaqueta de couro sintético", valor: 250.00, quantidade: 15, keywords: "jaquetas, roupas de inverno"},
    {codigo: 4, nome: "Tênis Esportivo", descritivo: "Tênis para corrida", valor: 180.00, quantidade: 30, keywords: "calçados, tênis, esportivo"},
    {codigo: 5, nome: "Chapéu Panamá", descritivo: "Chapéu de palha estilo Panamá", valor: 80.00, quantidade: 20, keywords: "chapéus, acessórios"},
    {codigo: 6, nome: "Cinto de Couro", descritivo: "Cinto de couro legítimo", valor: 60.00, quantidade: 50, keywords: "acessórios, cintos"},
    {codigo: 7, nome: "Vestido Floral", descritivo: "Vestido longo com estampa floral", valor: 150.00, quantidade: 25, keywords: "vestidos, roupas femininas"},
    {codigo: 8, nome: "Blusa de Tricô", descritivo: "Blusa de tricô com gola alta", valor: 120.00, quantidade: 35, keywords: "blusas, roupas de inverno"},
    {codigo: 9, nome: "Saia Plissada", descritivo: "Saia plissada midi", valor: 90.00, quantidade: 40, keywords: "saias, roupas femininas"},
    {codigo: 10, nome: "Calça Social", descritivo: "Calça social masculina preta", valor: 130.00, quantidade: 30, keywords: "calças, roupas formais"},
    {codigo: 11, nome: "Blazer Feminino", descritivo: "Blazer feminino ajustado", valor: 220.00, quantidade: 10, keywords: "blazers, roupas formais"},
    {codigo: 12, nome: "Tênis Casual", descritivo: "Tênis casual de couro", valor: 160.00, quantidade: 25, keywords: "calçados, tênis, casual"},
    {codigo: 13, nome: "Bermuda Cargo", descritivo: "Bermuda cargo masculina", valor: 70.00, quantidade: 45, keywords: "bermudas, roupas casuais"},
    {codigo: 14, nome: "Regata Esportiva", descritivo: "Regata para prática esportiva", valor: 35.00, quantidade: 60, keywords: "regatas, roupas esportivas"},
    {codigo: 15, nome: "Sapato Social", descritivo: "Sapato social masculino em couro", valor: 200.00, quantidade: 20, keywords: "calçados, sapatos sociais"},
    {codigo: 16, nome: "Meia de Algodão", descritivo: "Par de meias de algodão", valor: 15.00, quantidade: 100, keywords: "meias, acessórios"},
    {codigo: 17, nome: "Casaco de Lã", descritivo: "Casaco longo de lã", valor: 280.00, quantidade: 5, keywords: "casacos, roupas de inverno"},
    {codigo: 18, nome: "Óculos de Sol", descritivo: "Óculos de sol polarizado", valor: 120.00, quantidade: 40, keywords: "acessórios, óculos"},
    {codigo: 19, nome: "Luvas de Couro", descritivo: "Luvas de couro para inverno", valor: 90.00, quantidade: 15, keywords: "luvas, roupas de inverno"},
    {codigo: 20, nome: "Boné Trucker", descritivo: "Boné estilo trucker", valor: 50.00, quantidade: 60, keywords: "acessórios, bonés"}    
  ];

  public verDetalhe(item:Produto){
    localStorage.setItem("produto", JSON.stringify(item));
    window.location.href = "./detalhe";  
  }

  public adicionarItem(obj:Produto){
      let json = localStorage.getItem("cesta");
      let jsonCliente = localStorage.getItem("cliente");
      let cesta: Cesta = new Cesta();
      let item: Item = new Item();
      if(json==null){      //CESTA NAO EXISTE     
          item.codigo=obj.codigo;
          item.produto=obj;
          item.quantidade=1;
          item.valor= obj.valor;          
          cesta.codigo = 1;
          cesta.total = obj.valor;
          cesta.itens.push(item);          
          if(jsonCliente!=null) cesta.cliente = JSON.parse(jsonCliente);          
      } else {  //CESTA EXISTE
        let achou = false;
        cesta = JSON.parse(json);
        for(let i=0; i<cesta.itens.length; i++){
          if(cesta.itens[i].codigo==obj.codigo){  //ITEM JA EXISTE
            cesta.itens[i].quantidade = cesta.itens[i].quantidade + 1;
            cesta.itens[i].valor =  cesta.itens[i].quantidade * cesta.itens[i].produto.valor;
            achou = true;
            break;
          }            
        }
        if(!achou){  //ITEM NAO EXISTE
          item.codigo=obj.codigo;
          item.produto=obj;
          item.quantidade=1;
          item.valor= obj.valor;    
          cesta.itens.push(item);      
        }
      }

      cesta.total = 0; //ATUALIZA O VALOR TOTAL DA CESTA
      for(let i=0; i<cesta.itens.length; i++){
        cesta.total= cesta.itens[i].valor + cesta.total;
      }

      localStorage.setItem("cesta", JSON.stringify(cesta));
      window.location.href = "./cesta";
  }

}
