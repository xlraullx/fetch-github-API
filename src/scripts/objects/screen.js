const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="User Avatar"> 
                                        <div class="data"> 
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😪'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😪'}</p>
                                            <br>
                                            <p>Seguidores: ${user.followers == 0 ? 'Ninguém 😪' : user.followers == 1 ? `${user.followers} pessoa` : `${user.followers} pessoas`}</p>
                                            <p>Segue: ${user.following == 0 ? 'Não segue ninguém, é um lobo solitário 🐺' : user.following == 1 ? `${user.following} pessoa` : `${user.following} pessoas`}</p>
                                        </div>
                                      </div>`

        let repositoriesItens = ''

        user.repositories.forEach(repo => {
            repositoriesItens += `
            <li>
                <a href="${repo.html_url}" target="_blank"><p>${repo.name}</p> <br> 
                <span>🍴${repo.forks}</span> <span>⭐${repo.stargazers_count}</span> <span>👀${repo.watchers}</span> 
                ${repo.language === null ? '' : `<span class="language">🧑‍💻 ${repo.language}</span>`}</a>
            </li>
            `
        })

        if(repositoriesItens.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`
        }

        let eventsItens = ''
        
        user.events.forEach((event, indice) => {
            eventsItens += `<li><p><strong>${event.repo.name}</strong> - ${event.type === 'CreateEvent' ? 'Sem mensagem de commit</p>' : `${event.payload.commits[0].message}</p>`}</li> 
            ${user.events.length > indice+1 ? '<br><hr><br>' : ''}`
    })

        if (eventsItens.length > 0){
            this.userProfile.innerHTML += `<div class="events section">
                <h2>Eventos</h2>
                <br>
                <ul>${eventsItens}<ul>
            </div>`
        }
    }
    ,
    renderNotFound(){
        this.userProfile.innerHTML = `<h3>Usuário não encontrado</h3>`
    }
}

export {screen}