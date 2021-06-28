const passesUrl = "http://localhost:3000/passes/"

export function patchPass(pass, user){
    fetch(passesUrl + pass.id, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.token}`
        },
        body: JSON.stringify({ pass })
      })
}

export function postPass(pass, user) {
  fetch(passesUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.token}`
    },
    body: JSON.stringify({ pass: {...pass, user_id: user.id} })
  })
}

export function deletePass(id){
  fetch(passesUrl + id, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.token}`
    },

  })
}