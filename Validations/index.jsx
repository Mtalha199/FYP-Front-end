

export  function validateCNIC(cnic) {
    const regex = /^[0-9]{5}-[0-9]{7}-[0-9]$/;
    return regex.test(cnic);
  }

export  function validateAridNo(aridno){
  const regex=/^[0-9]{2}-[A-Z]{4}-[0-9]{4}$/;
  return regex.test(aridno)
}

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}