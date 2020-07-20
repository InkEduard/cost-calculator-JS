//  значение из текстових инпутов
const totalCost = document.getElementById('total-cost'),
      anInitialFee = document.getElementById('an-initial-fee'),
      creditTerm = document.getElementById('credit-term');

//  значение из range инпутов
const totalCostRange = document.getElementById('total-cost-range'),
      anInitialFeeRange = document.getElementById('an-initial-fee-range'),
      creditTermRange = document.getElementById('credit-term-range');

//  Итоговые значения
const totalAmountOfCredit = document.getElementById('amount-of-credit'),
      totalMonthlyPayment = document.getElementById('monthly-payment'),
      totalRecommendedIncome = document.getElementById('recommended-income');

// все range 
const inputsRange = document.querySelectorAll('.input-range');

// все кнопки с процентной ставкой:
const bankBtns = document.querySelectorAll('.bank');


//замапил инпут с range (ф-ия)
const assingValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}

// вызов ф-ии
assingValue();

// массив с объектами
const banks = [
    {
        name: 'privatbank',
        precents: 4.9
    },
    {
        name: 'alfabank',
        precents: 4.6
    },
    {
        name: 'oshadbank',
        precents: 5.3
    },
    {
        name: 'ukrsibbank',
        precents: 6.1
    }
];

let currentPrecent = banks[0].precents;

// событие клика на одну из кнопок (проц ставка)
for(let bank of bankBtns) {
    bank.addEventListener('click', () =>{
        for(let item of bankBtns){
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    })
}

// ф-ия которая отлавливает текущую кнопку на которую кликнули
const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    // получаем обьект с массива имя и процент
    const currentBank = banks.find(bank => bank.name === dataAttrValue); 
    // получаем текущий процент
    currentPrecent = currentBank.precents;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
}

for (let input of inputsRange){
    input.addEventListener('input', () => {
        assingValue();
        
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })    
}

const calculation = (totalCost = 0, anInitialFee = 0, creditTerm = 1) => {
    /* 
        ЕП - ежемесячный платеж
        РК - размер кредита
        ПС - процентная ставка
        КМ - количество месяцев 

        ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ;
    */

    let monthlyPayment; // ежемесячный платеж
    let lounAmount = totalCost - anInitialFee; // размер кредита
    let interestRate = currentPrecent; // процентная ставка
    let numberOfYears = creditTerm; // количество лет
    let numberOfMonths = 12 * numberOfYears; // количество месяцев 

    monthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
    const monthlyPaymentArouded = Math.round(monthlyPayment);
    if(monthlyPaymentArouded < 0) {
        return false;
    } else {
        totalAmountOfCredit.innerHTML = `${lounAmount} ₴`;
        totalMonthlyPayment.innerHTML = `${monthlyPaymentArouded} ₴`;
        totalRecommendedIncome.innerHTML = `${monthlyPaymentArouded + ((monthlyPaymentArouded / 100) * 35)} ₴`;
    }
}

// мой код
