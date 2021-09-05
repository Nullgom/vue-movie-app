exports.handler = async function (event, context) {
  return {
    statuscode: 200,
    body: JSON.stringify({
      name: 'HEOROPY',
      age: 85,
      email: 'thesecon@gmail.com'
    })
  }
}