export function validarCPF(cpf: string): boolean {
    cpf = cpf.replace(/[^\d]+/g, '');

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    const calcularDigito = (baseCpf: string, pesoInicial: number): number => {
        let soma = 0;
        for (let i = 0; i < baseCpf.length; i++) {
            soma += parseInt(baseCpf[i]) * pesoInicial--;
        }
        const resto = soma % 11;
        return resto < 2 ? 0 : 11 - resto;
    };

    const primeiroDigito = calcularDigito(cpf.substring(0, 9), 10);
    if (primeiroDigito !== parseInt(cpf[9])) {
        return false;
    }

    const segundoDigito = calcularDigito(cpf.substring(0, 10), 11);
    if (segundoDigito !== parseInt(cpf[10])) {
        return false;
    }

    return true;
}