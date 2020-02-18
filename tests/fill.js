const users = [
    {
        email : 'z1',
        password: 'z1',
        role: 'admin'
    },
    {
        email : 'a1',
        password: 'a1',
        role: 'user'
    },
    {
        email: 'a2', 
        password: 'a2',
        role: 'user'
    },
];

const items = [
    {
        name: 'Salvador Dali',
        price: '178',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/243/300/300.jpg',
    },
    {
        name: 'Pablo Picasso',
        price: '123',
        description: "making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose",
        image: 'https://i.picsum.photos/id/780/300/300.jpg',
    },
    {
        name: 'Fernando Botero',
        price: '155',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/1001/300/300.jpg',
    },
    {
        name: 'Salvador Dali',
        price: '178',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/243/300/300.jpg',
    },
    {
        name: 'Salvador Dali',
        price: '178',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/243/300/300.jpg',
    },
    {
        name: 'Salvador Dali',
        price: '178',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/243/300/300.jpg',
    },
    {
        name: 'Salvador Dali',
        price: '178',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/243/300/300.jpg',
    },
    {
        name: 'Salvador Dali',
        price: '178',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/243/300/300.jpg',
    },
    {
        name: 'Salvador Dali',
        price: '178',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/243/300/300.jpg',
    },
    {
        name: 'Salvador Dali',
        price: '178',
        description: 'he standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        image: 'https://i.picsum.photos/id/243/300/300.jpg',
    }, 
];

const categories = [
    {
        name: 'root',
        parent: null
    },
    {
        name: 'RTV',
        parent: 'root',
    },
    {
        name: 'Telewizory',
        parent: 'RTV',
    },
    {
        name: 'Telewizory 4K',
        parent: 'Telewizory',
    },
    {
        name: 'Telewizory FullHD',
        parent: 'Telewizory'
    },
    {
        name: 'AGD',
        parent: 'root'
    },
    {
        name: 'Pralki',
        parent: 'AGD'
    },
    {
        name: 'Lodówki',
        parent: 'AGD'
    },
    {
        name: 'Kuchenki',
        parent: 'AGD'
    },
];

const itemsRepository = require('../repositories/itemRepository');
const userRepository = require('../repositories/userRepository');
const categoriesRepository = require('../repositories/categoriesRepository');

module.exports = async function fill(){
    for(let i = 0; i < users.length; i++){
        var bcrypt = require('bcryptjs');
        var salt = bcrypt.genSaltSync(1);
        var pwdhash = bcrypt.hashSync(users[i].password, salt);
        await userRepository.createUser(users[i].email, pwdhash, users[i].role);
    }

    for(let i = 0; i < categories.length; i++){
        await categoriesRepository.addCategory(categories[i].name, categories[i].parent);
    }

    for(let i = 0; i < items.length; i++){
        await itemsRepository.insertProduct(items[i].name, items[i].price, items[i].description, items[i].image)
        }
};