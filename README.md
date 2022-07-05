# Ifood_Volta_Redonda
Consumo da API do Ifood para obter todas as lojas que estão no app na cidade de Volta Redonda

Como executar o Script:
Execute npm install para instalar as dependências;

Altere os parâmetros do arquivo Home.js: "latitude" e "longitude" de todas as funções "AllMerchants..."
OBS: É Necessário colocar o endereço equivalente aos parâmetros no site do ifood (https://www.ifood.com.br/restaurantes);

Execute o comando: node "NomeDoArquivo".js (Esta parte pode levar cerca de 20 minutos para executar (dependendo da quantidade de lojas),
pois o script está acessando cada loja, extraindo os dados e armazenando no arquivo out.csv);

O arquivo Dataout.ipynb foi feita em python 3.10.4 e foi utilizado apenas para tratar alguns erros de cadastro, como o nome dos bairros, valores bool e nome das categorias,
portanto, sua utilização não é obrigatória, caso queira utilizar, será necessário instalar as libs: pandas, numpy, lib "os" é opcional.
