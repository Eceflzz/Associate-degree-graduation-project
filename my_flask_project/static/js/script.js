// script.js

function addFavorite(item_id, category) {
    fetch('/add-favorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            'item': item_id,
            'category': category
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Favorilere eklendi!');
        } else {
            alert('Favorilere eklerken bir hata oluştu.');
        }
    })
    .then(data => {
        console.log('Sunucudan gelen yanıt:', data);     
    })
    .catch(error => {
        alert('Hata: ' + error.message);
    });
}

function loadNewRecommendations(mood, category) {
    fetch(`/next_recommendation/${mood}/${category}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Sunucudan veri alınamadı.');
            }
            return response.text();
        })
        .then(html => {
            document.getElementById("recommendation-area").innerHTML = html;
        })
        .catch(error => {
            alert("Bir hata oluştu: " + error.message);
        });
}

function removeFavorite(item_id, category) {
    if (!item_id || !category) {
        alert('Favoriden çıkarırken eksik veri!');
        return;
    }

    fetch('/remove-favorite', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            'item_id': item_id,
            'category': category
        })
    })
    .then(response => {
        if (response.ok) {
            alert('Favoriden çıkarıldı!');
            // Sayfayı yenileyebilir veya favoriler listesini güncelleyebilirsin.
        } else {
            alert('Favoriden çıkarırken bir hata oluştu.');
        }
    })
    .catch(error => {
        alert('Hata: ' + error.message);
    });
}

function toggleFavorite(icon, item_id, category) {
    if (icon.innerText === '🤍') {
        addFavorite(item_id, category);
        icon.innerText = '❤️'; 
    } else {
        removeFavorite(item_id, category);
        icon.innerText = '🤍'; 
    }
}