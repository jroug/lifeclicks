export const validateName = (val:string) => {
    var reg =  /^[αβγδεζηθικλμνξοπρστυφχψωΑΒΓΔΕΖΗΘΙΚΛΜΝΞΟΠΡΣΤΥΦΧΨΩςάέύίόώήϊϋa-zA-Z ]+$/;
    return reg.test(val);
}