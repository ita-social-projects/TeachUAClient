export const getCertificateTypeBySerialNumber = (serialNumber) => {
    const firstNumber = serialNumber == null ? '3' : serialNumber.toString().charAt(0);
    switch(firstNumber){
        case '1':
            return 'Тренер';
        case '2':
            return 'Модератор';
        default: 
            return "Учасник";
    }
};

export const getCertificateTypeAsString = (certificateType) => {
    switch(certificateType){
        case 1:
            return 'Тренер';
        case 2:
            return 'Модератор';
        default: 
            return "Учасник";
    }
};