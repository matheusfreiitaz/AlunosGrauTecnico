// =================
//  ELEMENTOS HTML
// =================

// Barra de progresso
const indicadorPasso1 = document.getElementById('step-indicator-1')
const indicadorPasso2 = document.getElementById('step-indicator-2')
const indicadorPasso3 = document.getElementById('step-indicator-3')
const linhaEtapa1e2 = document.getElementById('line-1-2')
const linhaEtapa2e3 = document.getElementById('line-2-3')

// Passos
const passo1 = document.getElementById('step1')
const passo2 = document.getElementById('step2')
const resultadoElegivel = document.getElementById('resultElegivel')
const resultadoInelegivel = document.getElementById('resultInelegivel')
const botaoNovaConsultaSucesso = document.getElementById('btnResetFromSuccess')
const botaoNovaConsultaErro = document.getElementById('btnResetFromFail')

// ===============
// ETAPA 1
// ===============

// Entradas
const entradaRenda = document.getElementById('rendaPerCapita')       // BUG 1 CORRIGIDO: declaradas ANTES de resetarSistema as usar
const entradaCadSim = document.getElementById('cadUnicoSim')
const entradaCadNao = document.getElementById('cadUnicoNao')

// Erros
const grupoRenda    = document.getElementById('group-renda')
const grupoCadUnico = document.getElementById('group-cadUnico')
const erroDeRenda   = document.getElementById('rendaError')
const erroDeCadUnico = document.getElementById('cadUnicoError')
const listaDeMotivos = document.getElementById('reasonsList')        // BUG 2 CORRIGIDO: declarada ANTES de mostrarMotivoInelegivel a usar

// Botão
const botaoPasso1 = document.getElementById('btnStep1')

// ==========================
// FUNÇÕES ESSENCIAIS
// ==========================

function mostrarErro(elementoErro, grupo, mensagem)
{
    elementoErro.textContent = mensagem
    elementoErro.classList.remove('hidden')
    grupo.classList.add('has-error')
}

function limparErro(elementoErro, grupo)
{
    elementoErro.textContent = ""
    elementoErro.classList.add('hidden')
    grupo.classList.remove('has-error')
}

function mostrarMotivoInelegivel(motivos)
{
    listaDeMotivos.innerHTML = ""

    for (let motivo of motivos)
    {
        const li = document.createElement("li")
        li.textContent = motivo
        listaDeMotivos.appendChild(li)
    }

    passo1.classList.add('hidden')
    passo2.classList.add('hidden')

    resultadoInelegivel.classList.remove('hidden')

    atualizarBarraDeProgresso(3)
}

function atualizarBarraDeProgresso(etapa)
{
    // Limpa tudo
    indicadorPasso1.classList.remove('active', 'done')
    indicadorPasso2.classList.remove('active', 'done')
    indicadorPasso3.classList.remove('active', 'done')

    linhaEtapa1e2.classList.remove('done')
    linhaEtapa2e3.classList.remove('done')

    if (etapa === 1)
    {
        indicadorPasso1.classList.add('active')
    }

    if (etapa === 2)
    {
        indicadorPasso1.classList.add('done')
        indicadorPasso2.classList.add('active')
        linhaEtapa1e2.classList.add('done')
    }

    if (etapa === 3)
    {
        indicadorPasso1.classList.add('done')
        indicadorPasso2.classList.add('done')
        indicadorPasso3.classList.add('active')
        linhaEtapa1e2.classList.add('done')
        linhaEtapa2e3.classList.add('done')
    }
}

function resetarSistema()
{
    // ETAPA 1
    entradaRenda.value = ""

    entradaCadSim.checked = false
    entradaCadNao.checked = false

    // ETAPA 2
    totalDePessoas.value = 1
    criancas0A6.value    = 0
    criancas7A18.value   = 0
    gestantes.value      = 0

    atualizarPreVizualizacao()

    listaDetalhada.innerHTML  = ""
    listaDeMotivos.innerHTML  = ""

    resultadoElegivel.classList.add('hidden')
    resultadoInelegivel.classList.add('hidden')

    passo2.classList.add('hidden')
    passo1.classList.remove('hidden')

    limparErro(erroDeRenda, grupoRenda)
    limparErro(erroDeCadUnico, grupoCadUnico)

    atualizarBarraDeProgresso(1)
}

// ==========================
// VALIDAÇÕES — ETAPA 1
// ==========================

function validarRenda()
{
    const renda = Number(entradaRenda.value)

    if (entradaRenda.value === "")
    {
        mostrarErro(erroDeRenda, grupoRenda, "Informe sua renda per capita!")
        return false
    }
    else if (renda < 0)
    {
        mostrarErro(erroDeRenda, grupoRenda, "A renda não pode ser negativa!")
        return false
    }
    else
    {
        limparErro(erroDeRenda, grupoRenda)
        return true
    }
}

function validarCadUnico()
{
    const estaSelecionado = entradaCadSim.checked || entradaCadNao.checked

    if (estaSelecionado === false)
    {
        mostrarErro(erroDeCadUnico, grupoCadUnico, "Selecione uma opção!")
        return false
    }
    else
    {
        limparErro(erroDeCadUnico, grupoCadUnico)
        return true
    }
}

function eElegivel()
{
    const valorRenda  = Number(entradaRenda.value)
    const temCadUnico = entradaCadSim.checked

    const motivos = []

    if (valorRenda > 218)
    {
        motivos.push("A renda per capita é maior que R$218,00.")
    }
    if (temCadUnico === false)
    {
        motivos.push("A família não possui CadÚnico.")
    }

    if (motivos.length > 0)
    {
        mostrarMotivoInelegivel(motivos)
        return false
    }

    return true
}

function irParaEtapa2()
{
    passo1.classList.add('hidden')
    passo2.classList.remove('hidden')
    atualizarBarraDeProgresso(2)
}

// BUG 3 CORRIGIDO: listener do botão estava vazio — implementação do fluxo completo
botaoPasso1.addEventListener('click', function() {

    const rendaValida    = validarRenda()
    const cadUnicoValido = validarCadUnico()

    // Só continua se AMBOS os campos forem válidos
    if (!rendaValida || !cadUnicoValido)
    {
        return
    }

    // Verifica elegibilidade; se não elegível, mostrarMotivoInelegivel já é chamado internamente
    const elegivel = eElegivel()

    if (elegivel)
    {
        irParaEtapa2()
    }
})

// ============
// ETAPA 2
// ============

// Entradas
const totalDePessoas = document.getElementById('totalPessoas')
const criancas0A6    = document.getElementById('criancas06')
const criancas7A18   = document.getElementById('criancas718')
const gestantes      = document.getElementById('gestantes')

// Botões mais e menos
const botaoTotalMenos = document.getElementById('btnTotalMinus')
const botaoTotalMais  = document.getElementById('btnTotalPlus')

const botaoCrianca0A6Menos = document.getElementById('btnC06Minus')
const botaoCrianca0A6Mais  = document.getElementById('btnC06Plus')

const botaoCrianca7A18Menos = document.getElementById('btnC718Minus')
const botaoCrianca7A18Mais  = document.getElementById('btnC718Plus')

const botaoGestanteMenos = document.getElementById('btnGestMinus')
const botaoGestanteMais  = document.getElementById('btnGestPlus')

// Pré-visualização
const preVisualizacaoTotal = document.getElementById('previewTotal')

const preVisualizacaoCrianca0A6Linha  = document.getElementById('prevC06Line')
const preVisualizacaoCrianca7A18Linha = document.getElementById('prevC718Line')
const preVisualizacaoGestanteLinha    = document.getElementById('prevGestLine')

const preVisualizacaoCrianca0A6Valor  = document.getElementById('prevC06Value')
const preVisualizacaoCrianca7A18Valor = document.getElementById('prevC718Value')
const preVisualizacaoGestanteValor    = document.getElementById('prevGestValue')

// Resultado final
const valorBeneficio = document.getElementById('benefitValue')
const listaDetalhada = document.getElementById('breakdownList')

// Botões
const botaoPasso2       = document.getElementById('btnStep2')
const botaoVoltarPasso2 = document.getElementById('btnBackStep2')

function calcularBeneficio()
{
    const quantidadeCriancas0A6  = Number(criancas0A6.value)
    const quantidadeCriancas7A18 = Number(criancas7A18.value)
    const quantidadeGestantes    = Number(gestantes.value)

    let valorTotal = 600

    valorTotal = valorTotal + (quantidadeCriancas0A6  * 150)
    valorTotal = valorTotal + (quantidadeCriancas7A18 * 50)
    valorTotal = valorTotal + (quantidadeGestantes    * 50)

    return valorTotal
}

function atualizarPreVizualizacao()
{
    const quantidadeCriancas0A6  = Number(criancas0A6.value)
    const quantidadeCriancas7A18 = Number(criancas7A18.value)
    const quantidadeGestantes    = Number(gestantes.value)

    const total = calcularBeneficio()

    // 0 a 6 anos
    if (quantidadeCriancas0A6 > 0)
    {
        preVisualizacaoCrianca0A6Linha.classList.remove('hidden')
        preVisualizacaoCrianca0A6Valor.textContent = `+ R$ ${quantidadeCriancas0A6 * 150},00`
    }
    else
    {
        preVisualizacaoCrianca0A6Linha.classList.add('hidden')
    }

    // 7 a 18 anos
    if (quantidadeCriancas7A18 > 0)
    {
        preVisualizacaoCrianca7A18Linha.classList.remove('hidden')
        preVisualizacaoCrianca7A18Valor.textContent = `+ R$ ${quantidadeCriancas7A18 * 50},00`
    }
    else
    {
        preVisualizacaoCrianca7A18Linha.classList.add('hidden')
    }

    // Gestantes
    if (quantidadeGestantes > 0)
    {
        preVisualizacaoGestanteLinha.classList.remove('hidden')
        preVisualizacaoGestanteValor.textContent = `+ R$ ${quantidadeGestantes * 50},00`
    }
    else
    {
        preVisualizacaoGestanteLinha.classList.add('hidden')
    }

    // Total
    preVisualizacaoTotal.textContent = `R$ ${total},00`
}

function alterarQuantidade(entrada, valor)
{
    let numeroAtual = Number(entrada.value)

    numeroAtual = numeroAtual + valor

    if (numeroAtual < 0)
    {
        numeroAtual = 0
    }

    entrada.value = numeroAtual

    atualizarPreVizualizacao()
}

// Botões de total
botaoTotalMais.addEventListener("click", function() {
    alterarQuantidade(totalDePessoas, 1)
})
botaoTotalMenos.addEventListener("click", function() {
    alterarQuantidade(totalDePessoas, -1)
})

// Botões de crianças de 0 a 6 anos
botaoCrianca0A6Mais.addEventListener("click", function() {
    alterarQuantidade(criancas0A6, 1)
})
botaoCrianca0A6Menos.addEventListener("click", function() {
    alterarQuantidade(criancas0A6, -1)
})

// Botões de crianças de 7 a 18 anos
botaoCrianca7A18Mais.addEventListener("click", function() {
    alterarQuantidade(criancas7A18, 1)
})
botaoCrianca7A18Menos.addEventListener("click", function() {
    alterarQuantidade(criancas7A18, -1)
})

// Botões de gestantes
botaoGestanteMais.addEventListener("click", function() {
    alterarQuantidade(gestantes, 1)
})
botaoGestanteMenos.addEventListener("click", function() {
    alterarQuantidade(gestantes, -1)
})

// Entrada manual
totalDePessoas.addEventListener("input", atualizarPreVizualizacao)
criancas0A6.addEventListener("input", atualizarPreVizualizacao)
criancas7A18.addEventListener("input", atualizarPreVizualizacao)
gestantes.addEventListener("input", atualizarPreVizualizacao)

function validarEtapa2()
{
    const total = Number(totalDePessoas.value)

    // BUG 4 CORRIGIDO: gestantes também ocupam vagas na família — incluídas no total de dependentes
    const totalDependentes = Number(criancas0A6.value) + Number(criancas7A18.value) + Number(gestantes.value)

    if (total <= 0)
    {
        alert("Informe o número de pessoas na família")
        return false
    }

    if (totalDependentes > total)
    {
        alert("O número de dependentes não pode ser maior que o número de pessoas na família")
        return false
    }

    return true
}

function adicionarItemALista(nome, valor)
{
    const li = document.createElement("li")
    li.classList.add("breakdown-item")
    li.innerHTML = `<span class="breakdown-label">${nome}</span> <span class="breakdown-value">${valor}</span>`
    listaDetalhada.appendChild(li)
}

function mostrarResultadoElegivel()
{
    const total = calcularBeneficio()

    valorBeneficio.textContent = `R$ ${total},00`

    listaDetalhada.innerHTML = ""

    adicionarItemALista("Benefício base", "R$ 600,00")

    if (Number(criancas0A6.value) > 0)
    {
        adicionarItemALista("Crianças de 0 a 6 anos", `R$ ${Number(criancas0A6.value) * 150},00`)
    }

    if (Number(criancas7A18.value) > 0)
    {
        adicionarItemALista("Jovens de 7 a 18 anos", `R$ ${Number(criancas7A18.value) * 50},00`)
    }

    if (Number(gestantes.value) > 0)
    {
        adicionarItemALista("Gestantes", `R$ ${Number(gestantes.value) * 50},00`)
    }

    adicionarItemALista("Total", `R$ ${total},00`)

    passo2.classList.add('hidden')
    resultadoElegivel.classList.remove('hidden')

    atualizarBarraDeProgresso(3)
}

botaoPasso2.addEventListener("click", function() {
    const etapaValida = validarEtapa2()

    if (etapaValida === false)
    {
        return
    }

    mostrarResultadoElegivel()
})

botaoVoltarPasso2.addEventListener('click', function() {
    passo2.classList.add('hidden')
    passo1.classList.remove('hidden')
    atualizarBarraDeProgresso(1)
})

botaoNovaConsultaSucesso.addEventListener('click', function() {
    resetarSistema()
})

botaoNovaConsultaErro.addEventListener('click', function() {
    resetarSistema()
})

// Inicialização
atualizarBarraDeProgresso(1)
atualizarPreVizualizacao()
