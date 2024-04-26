//console.log('Bağlantı kontrol')

const placeholder = document.querySelector('.placeholder')
//console.log(placeholder)
const editableInput = document.querySelector('.editable')
//console.log(editableInput)
const tweetButton = document.querySelector('.button')
//console.log(tweetButton)
const counter = document.getElementById('counter')
//console.log(counter)
const readonly = document.querySelector('.readonly')
//console.log(readonly)


//Tıklama olayını dinliyoruz 
editableInput.addEventListener('click', () => {
    //placehodler (span) rengini değiştiriyoruz
    placeholder.style.color = "#98a5b1"
})

//Inputun odağını dışarıya tıklanınca kaldırıyor
editableInput.onblur = () => {
    placeholder.style.color = '#333'
}

//Klavyenin basılma olayını dinliyor
editableInput.onkeypress = (e) => {
    placeholder.style.display = 'none'
    //console.log(e)
    İnputValidate(e.target.innerText)
}


//Klavyeden parmağımızı çektiğimiz anı dinliyor
editableInput.onkeyup = (e) => {
    placeholder.style.display = 'none'
    İnputValidate(e.target.innerText)
}


//Yazılan tweetin karakter kontrolü 
const inputValidate = (tweet) => {
    //console.log(tweet)
    //dışarıdan gelen input verisinin uzunluğu 
    const tweetLenght = tweet.lenght;
    //
    const tweetLimit = 5

    //Kalan karakter limiti 
    const currentLimit = tweetLimit - tweetLenght
    //console.log(tweetLenght)
    //console.log(counter)

    //Karakter varmı 
    if (tweetLenght <= 0) {

        //KARAKTER  YOKSA
        //placeholder görünür hale getirir
        placeholder.style.display = 'block'
        //tweet butonunu pasif yapma
        tweetButton.classList.remove('active')
        //sayacın görünürlüğünü ortadan kaldırma
        counter.style.display = 'none'
    } else {

        //KARAKTER VARSA 

        //Tweet butonunu aktif hale getirme
        tweetButton.classList.add('active')
        //Sayacı görünür yapma
        counter.style.display = 'block';

        //sayacın değerine hesaplanan değeri atama 
        counter.innerText = currentLimit
    }
    let newTweet

    //KARAKTER SINIRI AŞILDI MI?
    if (tweetLenght > tweetLimit) {
        //KARAKTER SINIRI AŞILDIĞI DURUM 
        //substr ile başlangıç(tweet limiti) ve bitiş(girilen toplam karakter sayısı) noktası belirleyerek taşan karakteri bulma 
        let overTweet = tweet.substr(tweetLimit, tweetLenght)
        //console.log(overTweet)
        //Taşan karakterleri arka planını kırmızı yapmak için span oluşturma
        let overTweetElement = `<span class='overTweet'>${overTweet}</span>`;
        //console.log(overTweetElement)
        //normal karakterleri ve taşan karakterleri birleştirip yeni bir tweet oluşturma
        let newTweet = tweet.substr(0, tweetLimit) + overTweetElement
        //yeni tweet readonly göstereceğimiz için zIndexde gönürünür yaptık
        readonly.style.zIndex = '1'
        //sayacın sınırı aşan karakterleri kırmızı gösterme
        counter.style.color = 'red'

        //sınır aşıldıysa buttonu pasif yapma
        tweetButton.classList.remove('active')
    } else {

        //KARAKTER SINIRININ AŞILMADIĞI DURUM

        //sayacı kendi normal rengi
        counter.style.color = '#333'
        //taşma işlemi oluştuğunda görünür yapılan yapıyı görünmez yapma
        readonly.style.zIndex = '-5'
    }

    //oluşan yeni tweeti göstermek için html tarafına gönderme
    readonly.innerHTML = newTweet
};