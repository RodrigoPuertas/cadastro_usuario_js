import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  // Estilo do contêiner principal que alinha e centraliza todos os elementos
  container: {
    flex: 1, // Ocupa todo o espaço disponível na tela
    backgroundColor: '#f0f4f7', // Cor de fundo suave
    alignItems: 'center', // Centraliza os itens horizontalmente
    justifyContent: 'center', // Centraliza os itens verticalmente
    padding: 20, // Adiciona espaço ao redor dos elementos
  },
  // Estilo do campo de entrada de texto (input)
  input: {
    width: '90%', // Largura do campo de 90% da largura do contêiner
    height: 50, // Altura do campo de 50 unidades
    borderColor: '#007BFF', // Cor da borda azul para destaque
    borderWidth: 2, // Largura da borda de 2 unidades para maior visibilidade
    marginBottom: 25, // Espaço inferior de 25 unidades entre os campos
    paddingHorizontal: 15, // Espaço interno horizontal de 15 unidades
    borderRadius: 10, // Bordas arredondadas para suavidade
    backgroundColor: '#ffffff', // Cor de fundo branca para o campo
    fontSize: 18, // Tamanho da fonte de 18 unidades para melhor legibilidade
    shadowColor: '#000', // Cor da sombra preta para dar profundidade
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra para sutileza
    shadowRadius: 5, // Raio da sombra para um efeito suave
  },
  // Estilo do botão de ação
  button: {
    backgroundColor: '#007BFF', // Cor de fundo azul para destaque
    paddingVertical: 15, // Espaço interno vertical de 15 unidades
    borderRadius: 10, // Bordas arredondadas para suavidade
    flex: 1, // Cada botão ocupa o mesmo espaço disponível
    marginHorizontal: 10, // Espaço entre os botões
    alignItems: 'center', // Centraliza o texto dentro do botão
    shadowColor: '#000', // Cor da sombra preta para dar profundidade
    shadowOffset: { width: 0, height: 2 }, // Deslocamento da sombra
    shadowOpacity: 0.1, // Opacidade da sombra para sutileza
    shadowRadius: 5, // Raio da sombra para um efeito suave
  },
  // Estilo do texto dentro do botão
  buttonText: {
    color: '#ffffff', // Cor branca para contraste com o fundo azul
    fontSize: 18, // Tamanho da fonte de 18 unidades para melhor legibilidade
    fontWeight: 'bold', // Fonte em negrito para dar destaque ao texto
  },
  // Estilo do título principal
  title: {
    fontSize: 32, // Tamanho da fonte de 32 unidades para destaque
    fontWeight: 'bold', // Fonte em negrito para reforçar a importância do título
    color: '#333333', // Cor cinza escuro para contraste com o fundo
    marginBottom: 30, // Espaço inferior de 30 unidades para separar do restante dos elementos
  },
  // Estilo do contêiner dos botões
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centraliza os botões horizontalmente
    alignItems: 'center', // Centraliza os botões verticalmente (se necessário)
    width: '100%', // Usa toda a largura disponível
    marginBottom: 15,
  },
});

export default styles;
