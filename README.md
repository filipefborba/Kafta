# Kafta
Eduardo Tirta, Filipe Borba, Hugo Mendes  
6º Semestre  
Engenharia da Computação Insper  
Megadados

## Sumário

* [Introdução](#introdução)
  * [O que é o Kafka?](#o-que-é-o-kafka)
  * [Termos](#termos)
  * [Funcionamento](#funcionamento)
  * [Situações de Uso](#situações-de-uso)
* [Aplicação Proposta](#aplicação-proposta)
* [Desafios](#desafios)
* [Referências](#referências)

## Introdução
### O que é o Kafka?

<p align="center">
  <img
    alt="Logo Kafka"
    src="https://kafka.apache.org/images/logo.png"
    width="40%"
  />
</p>

O Kafka é um sistema distribuído de envio de mensagens que provê uma transmissão rápida, altamente escalável e redundante através de um modelo publicação-inscrição. O design distribuído do Kafka lhe dá uma série de vantagens. Primeiro, o Kafka permite um elevado número de consumidores permanentes ou temporários. Segundo, o Kafka tem alta disponibilidade e é resistência a falhas de nós, além de suportar recuperação automática. Em sistemas de dados do mundo real, essas características fazem do Kafka uma aplicação ideal para comunicação e integração de componentes de sistemas de larga escala. O Kafka possui, então, três principais capacidades: publicação e inscrição para fluxos de dados, similar à uma fila de mensagens ou um sistema de transmissão de mensagens corporativo; armazenamento de fluxo de dados de modo tolerante à falhas e durável; processamento de fluxo de dados em tempo real. Uma das principais qualidades do Kafka é sua capacidade de restaurar os dados caso possua alguma falha no sistema, esta recuperação ocorre já que é armazenado em uma lista todos os eventos. Assim, quando se estabelece a conexão, os dados são sincronizados.


### Termos

Alguns termos do Kakfa são muito recorrentes e essenciais para o entendimento de como ele funciona. Estes termos são: topics (tópicos), producers, consumers e brokers.  
Todas as mensagens do Kafka são organizadas em **tópicos**. Se o intuito é mandar uma mensagem, manda-se para um tópico específico e se o intuito é ler, lê-se desse tópico especfico. É então responsável por toda a comunicação entre producers e consumers.
O **producer** é o responsável por publicar as mensagens nos tópicos, enquanto o **consumer** irá ler as mensagens dos tópicos.
O Kafka é uma aplicação distribuída, que roda em clusters, o **broker** é cada nó existente dentro do cluster.

### Funcionamento
<p align="center">
  <img
    alt="Imagem esquematica do Kafka"
    src="https://kafka.apache.org/20/images/kafka-apis.png"
    width="60%"
  />
</p>

O Kafka possui quatro APIs principais. São elas:
* Producer API: permite que uma aplicação publique um fluxo de dados para um ou mais tópicos do Kafka.
* Consumer API: permite que uma aplicação se inscreva para um ou mais tópicos e processe o fluxo de dados produzido para ela.
* Streams API: permite que uma aplicação atue como um processadores de fluxo, consumindo um fluxo de entrada de um ou mais tópicos e produzindo um fluxo de saída para um ou mais tópicos de saída, efetivamente transformando os fluxos de entrada em fluxos de saída.
* Connector API:  permite construir e rodar producers ou consumers reutilizáveis que conectam tópicos do Kafka com aplicações ou sistemas de dados existentes. Por exemplo, um conector para um banco de dados relacional pode capturar todas as mudanças de uma tabela.

### Situações de Uso

Algumas descrições de usos populares do Kafka serão descritos nessa parte. São eles:

* Transmissão de Mensagens  
O Kafka substitui bem um intermediário de mensagens (ou 'message broker') tradicional. Message Brokers são usados para uma variedade de aplicações, como desacoplar processamento e produção de dados, transformar em buffer mensagens sem tratamento, etc. Em comparação com outros sistemas, o Kafka possui um melhor throughput, replicação, particionamento próprio e tolerância à falhas, o que faz dele uma boa solução para aplicações de processamento de mensagens em larga escala. 
Kafka works well as a replacement for a more traditional message broker. Message brokers are used for a variety of reasons (to decouple processing from data producers, to buffer unprocessed messages, etc). In comparison to most messaging systems Kafka has better throughput, built-in partitioning, replication, and fault-tolerance which makes it a good solution for large scale message processing applications. Ele é muitas vezes comparado com o ActiveMQ ou o RabbitMQ.

* Monitoramento de Atividade de Websites  
O uso original do Kafka era de possibilitar a reconstrução de um pipeline de monitoramento de atividades de usuários como um conjunto de feeds publicação-leitura em tempo real. Isso significa que as atividades do site (buscas e outras ações que os usuários realizam) são publicadas para uma central de tópicos com um tópico por tipo de atividade. Esses feeds são disponíveis para leitura para uma variedade de aplicações como processamento em tempo real, backup, monitoramento, entre outros. Monitoramento de Atividades frequentemente possui um alto volume de mensagens, dado que geralmente muitas ações são realizadas por cada usuário.

* Métricas  
O Kafka também é usado para monitorar dados operacionais. Isso envolve agregar estatísticas de diferentes aplicações para produzir feeds centralizados de data operacional. Esse caso é utilizado nesse projeto, por exemplo.

* Agregação de Log (Log Aggregation)  
Muitas pessoas usam o Kafka como um substituto para soluções de agregação de logs. Basicamente, a ideia é coletar arquivos de log de diferentes servidores e colocá-los em um lugar central para processamento. O Kafka abstrai os detalhes dessa dinâmica trazendo um fluxo de mensagens mais simples. Isso possibilita um processamento de menor latência e um suporte facilitado para múltiplas fontes de dados e consumo de dados distribuído. Em comparação com outros sistemas com Scribe ou Flume, oKafka oferece uma performance igualmente boa e uma durabilidade maior devido à replicação, além de uma menor latência de ponta a ponta.

* Processamento de Fluxo (Stream Processing)  
Muitos usuários utilizam o Kafka para processar dados em um pipeline de processamento que consiste em vários estágios, onde um dado puro é consumido por tópicos do Kafka e depois agregado, enriquecido ou transformado em outros tópicos para consumo posterior ou mais processamento. Esses pipelines criam gráficos em tempo real do fluxo de dados baseados nos tópicos individuais.

* Event Sourcing  
Event sourcing é um estilo de design de aplicação no qual mudanças no estado dela são arquivados como uma sequência de logs ordenada por tempo. O suporte para armazenamento de logs pesados do Kafka fazem dele uma ótimo backend para uma aplicação desenhada com esse propósito.

* Commit Log  
O Kafka pode servir como um tipo de commit-log externo para sistemas distribuídos. Esse log ajuda a replicar os dados entre os nós e agir como um mecanismo de sincronização entre nós que falham para recuperar seus dados.

## Aplicação Proposta
O projeto propõe demonstrar uma das possíveis aplicações do Kafka. Para tanto, foi criada uma aplicação cliente no estilo de Dashboard que servirá como um Centro de Controle Oceânico, recebendo dados de sensores. Os sensores são simulados por diversas APIs que enviam dados de forma muito rápida para o Kafka, a fim de testar sua coleta e inserção em fila. A ideia é que as informações sejam recebidas e repassadas com mínima perda. Os dados enviados serão: temperatura, salinidade e volume, simulando o comportamento oceânico de forma aleatória, assim, pode-se verificar ao vivo os dados recebidos.  

![Diagrama da aplicação proposta](https://i.imgur.com/KGDB2D7.png)
  
Nessa situação, pode-se verificar que os Producers, são os sensores simulados, mandando dados para o Kafka e nosso Consumer é a aplicação de Dashboard do Centro de Controle Oceânico.

## Tutorial

O projeto pode ser feito tanto localmente quanto com o auxílio de máquinas da AWS. No final do tutorial está a organização para o caso de máquinas na AWS. Não esqueça de usar ```sudo apt-get update``` antes de instalar as dependências e iniciar o projeto. A recomendação é instalar e testar cada passo deste tutorial antes de rodar todos os programas ao mesmo tempo.

#### Passo 0: Pré Requisitos
###### Clonar Repositório:
git clone https://github.com/filipefborba/Kafta.git

###### Habilitar CORS:
Para rodar o Consumer, a extensão do Chrome chamado CORS deve estar habilitado, para que o React funcione normalmente, assim, os dados começam a ser mostrados. Isso ocorre porque não utilizamos o header Access-Control-Allow-Origin nas requisições.
       
#### Passo 1: Configuração Kafka Server
Primeiramente, instale a dependência do Kafka que é o Java através do comando ```sudo add-apt-repository ppa:webupd8team/java && sudo apt update && sudo apt install oracle-java8-installer && sudo apt install oracle-java8-set-default```
Primeiramente, é necessário configurar o Kafka Server. Para tanto, basta seguir [este](https://kafka.apache.org/quickstart) tutorial até o passo 3 (Create a Topic). A partir desse ponto, utilizamos serviços próprios para a demonstração.
Para finalizar a configuração do Kafka Server, precisamos criar os tópicos para os producers e consumers se comunicarem. Os tópicos disponíveis nesse tutorial são "Atlantic" e "Pacific", por padrão. Use o seguinte comando para criar o tópico: ```bin/kafka-topics.sh --create --zookeeper localhost:2181 --replication-factor 1 --partitions 1 --topic Atlantic```. Com esse comando, o tópico Atlantic será criado e será possível realizar a comunicação. Caso queira criar o tópico Pacific também, basta trocar o nome no comando.  
Por fim, entrar no arquivo config/server.properties e adicionar a linha ```listeners=PLAINTEXT://<SeuHostName>:9092```.  
O hostname será o IP da máquina da AWS ou 0.0.0.0 (localhost).

#### Passo 2: O Producer
Os producers são APIs que realizam várias requisições POST rapidamente utilizando a biblioteca de Producer do Kafka.
Então, após finalizar o tutorial no site do Apache Kafka, o sistema está preparado para enviar e receber mensagens. Antes, é necessário instalar o Kafka para Python, para que o primeiro Producer possa rodar. Use o comando ```sudo pip3 install kafka-python``` ou use um [virtualenv](https://virtualenv.pypa.io/en/latest/).
Com isso, basta editar os arquivos ```pacific_producer.py``` e/ou ```atlantic_producer.py``` com o IP e Porta do Kafka Server configurado no objeto ```KafkaProducer``` (linha 25), além do nome do tópico criado no método ```producer.send``` (linha 23). Rode um dos producers (ou todos) e não esqueça de usar o Python 3.

#### Passo 3: O Consumer
O consumer consiste em uma API Flask que faz as requisições GET para o Kafka Server e uma aplicação Web em React que renderiza a interface do Dashboard e realiza as requisições GET para a API Flask através de sua "Fetch API", atualizando os valores das tabelas. A Fetch API é apenas uma forma simplificada e mais flexível de fazer requisições AJAX.
Para rodar a API em Flask, basta instalar as dependências através do ```sudo apt install python-flask, sudo pip3 install kafka-python```, verificar se dentro do arquivo run_app.py o bootstrap_servers, nas linhas 13 e 35, está com o ip correto, e assim, prosseguir e utilizar o comando python```python3 run_app.py```. Verifique se há alguma atividade no console, indicando que a API está recebendo os dados do Kafka.  
Com isso, é necessário rodar a aplicação Web usando o React. Para tanto, é necessário instalar o Node.JS e o npm.```sudo apt-get install nodejs``` e ```sudo apt-get install npm``` resolvem o problema. Após isso, use o comando ```npm install``` dentro da pasta ConsumerDashboard para instalar os pacotes da aplicação em React e ```npm start``` para iniciar a aplicação, que irá abrir no browser diretamente se você estiver fazendo tudo localmente. Para o caso da AWS, é necessário acessar o IP da máquina na porta 5000. Caso não consiga conectar, verifique a mensagem no terminal ao iniciar a aplicação em React.

#### Resultado
Ao seguir os passos do tutorial, seu Dashboard deve iniciar sem dados dos sensores, como na imagem a seguir:

<p align="center">
  <img
    alt="Sem Dados"
    src="https://i.imgur.com/w5gV9PZ.png"
    width="60%"
  />
</p>


Contudo, os dados do Kafka devem chegar, populando o estado da aplicação e mostrando os valores dos sensores atualizando.
<p align="center">
  <img
    alt="Com Dados"
    src="https://i.imgur.com/YsW2N35.png"
    width="60%"
  />
</p>

#### AWS
Caso queira utilizar as máquinas da AWS, não esqueça de rodar ```sudo apt-get update``` para instalar as dependências e etc. Ocorrerão falhas se esse comando não for utilizado. Além disso, o tutorial prevê que o usuário irá se conectar às máquinas por SSH e realizar os passos descritos.  
As máquinas usadas foram:
* Kafka Server: (1) m4.xlarge
* Producers: (1) t2.large
* Consumer: (1) t2.micro

## Desafios
O grande desafio do projeto foi monitorar a perfomance do Kafka, uma vez que a ideia era ver em qual ponto seria necessário a utilização de uma solução robusta como o Kafka. Existem diversas ferramentas (dashboards) de monitoramento da perfomance, entretanto a utilização e configuração das mesmas não é trivial, visto que, para que tudo funcione perfeitamente, várias configurações manuais devem ser feitas. Apesar de haver bastante documentação, ela não é clara para quem está começando a mexer com essa tecnologia. O grupo havia conseguido com sucesso fazer o monitoramento das métricas através de um projeto chamado Kafka Manager, entretanto, só funcionou quando o Kafka-Server estava sendo rodado no localhost, a partir do momento que foi para uma instância EC2, o manager parou de funcionar (mesmo tendo habilitado as portas necessárias e criando as variáveis de ambiente conforme a documentação). A solução foi utilizar a ferramenta JMX Tool para monitorar as métricas do servidor via console, sem interface mas com os dados necessários à disposição.
Outro desafio considerável foi trabalhar com diversos "mini-projetos" rodando em ambientes diferentes e comunicando entre si. Temos os producers, o Kafka-Server, a API Python para fazer o papel de consumer e uma aplicação consumindo essa API para mostrar os dados numa dashboard.

## Explorando o Kafka

Para testar os poderes do kafka comecamos com a seguinte configuracao:
1 instancia m4 xlarge que abriga 1 node zookeeper e 1 broker (dividido em dois topicos)
1 instancia t2 large que abriga dois producers (cada um publicando em um topico diferente)

Para a seguinte configuracao obtivemos os seguintes resultados (obtidos atraves da ferramenta JMX_TOOLS):
<p align="center">
  <img
    alt="Grafico de Bytes Out Per Sec"
    src="https://i.imgur.com/leaggR5.png"
    width="60%"
  />
</p>

<p align="center">
  <img
    alt="Grafico de Bytes In Per Sec"
    src="https://i.imgur.com/nogY1tv.png"
    width="60%"
  />
</p>

Os BytesRejectedPerSec permaneceram zerados. O que nos levou a uma nova curiosiade, sera que se aumentarmos consideravelmente a potencia dos producers o Kafka "engasga" ? 

Em adendo a configuracao ja mencionada adicionamos mais 2 instancias m4.xlarge como producers, seguem abaixo os resultados.

<p align="center">
  <img
    alt="BytesOut"
    src="https://i.imgur.com/bP8tniZ.png"
    width="60%"
  />
</p>


<p align="center">
  <img
    alt="BytesIn"
    src="https://i.imgur.com/YdKod05.png"
    width="60%"
  />
</p>

Como esperado a quantidade de bytes na saida foi maior, entretanto obtivemos 3 resultados inesperados.  O primeiro:
 - A quantidade de bytes in diminuiu
 - A quantidade de bytes rejected permaneceu zerada
 - O Servidor do Kafka crashou com o seguinte erro: " ERROR Error while appending records to Pacific-0 in dir /tmp/kafka-logs (kafka.server.LogDirFailureChannel) java.io.IOException: No space left on device"

## Robustez
### Lidando com escritas
Cada broker contm um número de partições e cada uma dessas partições podem ser um líder ou uma réplica de um tópico. Todas as escritas e leituras de um tópico passam pelo líder e o líder coordena a atualização das réplicas com novos dados. Se o líder falhar, a replica toma o lugar de líder.
 
Ao se comunicar com um cluster Kafka, todas as mensagens são enviadas para o líder da partição. O líder é responsável por gravar a mensagem em sua própria réplica de modo sincrono e, uma vez que a mensagem tenha sido "commited", é responsável por propagar a mensagem para réplicas adicionais em diferentes brokers. Cada réplica reconhece que recebeu a mensagem e agora pode ser chamada em sincronia.

<p align="center">
  <img
    alt="Escrita"
    src="https://i.imgur.com/ckgG795.png"
    width="60%"
  />
</p>

## Lidando com erros
Quando uma replica falha ela deixa de receber mensagens, ficando cada vez mais fora de sincronia com o líder. Na imagem abaixo, a réplica 3 não está mais recebendo mensagens do líder.

<p align="center">
  <img
    alt="Lidando com erros"
    src="https://i.imgur.com/sagM568.png"
    width="60%"
  />
</p>

Se o líder falhar, a replica toma o lugar de líder. Mas caso não existam mais líderes, o Kafka controller vai detectar a perda de líderes e retornar um erro de LeaderNotAvailable. Com isso, nenhum dado será perdido, desde que os producers e consumers lidem com essa possibilidade e tentem novamente de forma apropriada.

## Referências
https://kafka.apache.org  
https://en.wikipedia.org/wiki/Apache_Kafka  
https://www.confluent.io/what-is-apache-kafka/  
https://medium.com/luizalabs/entendendo-o-apache-kafka-i-27342ec9e29  
https://sookocheff.com/post/kafka/kafka-in-a-nutshell/  
