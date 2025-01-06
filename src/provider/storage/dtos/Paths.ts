const temps = (fileName: string)=>  {
  return 'src/storage/temp/' + fileName ;
}

const books = (fileName: string)=>  {
  return 'src/storage/books/' + fileName
}
const images = (fileName: string)=>  {
  return 'src/storage/images/' + fileName
}

export {
  temps,
  books,
  images
}
