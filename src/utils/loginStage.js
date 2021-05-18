const namespace = "loginStage"

export function saveItem(key , value){
  let storage = window.localStorage.getItem(namespace)

  if(!storage){
    storage = {}  //init storage
  }
  else {
    storage = JSON.parse(storage) //parse JSON to obj
  }

  storage[key] = value
  window.localStorage.setItem(namespace, JSON.stringify(storage))  //set localStorage
}

export function loadItem(key , def){
  let storage = window.localStorage.getItem(namespace)

  if(!storage) {
    return def
  }

  storage = JSON.parse(storage)
  let result = storage[key]
  return result || def  //if result which key point to is null , return def
}