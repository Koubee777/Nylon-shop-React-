import { Box, Flex } from '@chakra-ui/react';
import Dexie from 'dexie';
import { useEffect, useState } from 'react';

const db = new Dexie('ProductDatabase');

// Создаем таблицу для товаров
db.version(1).stores({
  products: '++id,name,url'
});

export const getProductByUrl = async (pageUrl) => {
  try {
    const items = await db.products.where('url').equals(pageUrl).toArray();
    console.log('Items fetched by name:', items);
    console.log(pageUrl);
    
    return items;
  } catch (err) {
    console.error('Failed to fetch items by name:', err);
  }
};

export const getAlldbProducts = async () => {
  try {
    const items = await db.products.toArray();
    // console.log('Item fetched:', items);
    return items;
  } catch (err) {
    console.error('Failed to fetch item:', err);
  }
};

export const Testdb = ({productsdb}) => {

  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [image, setImage] = useState(null);
  const [products, setProducts] = useState([]);
  const [searchByName, setSearchByName] = useState('');
  const [searchByUrl, setSearchByUrl] = useState('');

  // Функция для добавления товара
  const addProduct = async () => {
    if (name && url) {
      await db.products.add({ name, url, image });
      setName('');
      setUrl('');
      setImage(null);
      loadProducts();
    } else {
      alert('Заполните все поля');
    }
  };
  useEffect(() => {
    console.log(productsdb)
    const defaultAdd = async (el) => {
      try {
        await db.open();
          const item = { 
            id: el.id,
            name: el.name,
            url: el.url,
            image: el.img,
            title: el.title,  
            desc: el.desc,
            price: el.price,
            oldPrice: el.oldPrice,
            category: el.category,
            countInCart: el.countInCart,
          }; 
          await db.products.put(item);
      } catch (err) {
        console.error('Error adding data to IndexedDB:', err);
      }
    };

    productsdb.map(el=>{
      defaultAdd(el);

    })
    
   
  }, []);

  // Функция для получения всех товаров
  const loadProducts = async () => {
    const allProducts = await db.products.toArray();
    filterProducts(allProducts);
  };

  // Загружаем товары при монтировании компонента
  useEffect(() => {
    loadProducts();
  }, []);

  // Поиск
  const handleSearchByNameChange = (e) => {
    setSearchByName(e.target.value);
  };

  const handleSearchByUrlChange = (e) => {
    setSearchByUrl(e.target.value);
  };

  // Функция для обработки загрузки картинки
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Функция для удаления товара по его ID
  const deleteProduct = async (id) => {
    await db.products.delete(id);
    loadProducts();
  };

  // Функция для фильтрации товаров по имени и URL
  const filterProducts = (products) => {
    const filtered = products.filter((product) => {
      const matchesName = product.name.toLowerCase().includes(searchByName.toLowerCase());
      const matchesUrl = product.url.toLowerCase().includes(searchByUrl.toLowerCase());
      return matchesName && matchesUrl;
    });
    setProducts(filtered);
  };

  // Обновляем список товаров при изменении значений поиска
  useEffect(() => {
    loadProducts();
  }, [searchByName, searchByUrl]);

  
  return (
    <Flex
        direction="column"
        m="0px auto"
        w="500px"
        bgColor="blue.100">
        <h2>Добавить товар</h2>
        <input
            type="text"
            placeholder="Имя"
            value={name}
            onChange={(e) => setName(e.target.value)}
        />
        <input
            type="url"
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
        />
        <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
        />
        <button onClick={addProduct}>Добавить</button>

        <h2>Поиск</h2>
        <input
            type="text"
            placeholder="Поиск по имени"
            value={searchByName}
            onChange={handleSearchByNameChange}
        />
        <input
            type="text"
            placeholder="Поиск по URL"
            value={searchByUrl}
            onChange={handleSearchByUrlChange}
        />

        <h2>Список товаров</h2>
        <ul>
            {products.map((product) => (
            <li key={product.id}>
                <div>
                {product.name} - <a href={product.url} target="_blank" rel="noopener noreferrer">{product.url}</a>
                </div>
                {product.image && (
                <img src={product.image} alt={product.name} style={{ width: '100px' }} />
                )}
                <button onClick={() => deleteProduct(product.id)}>Удалить</button>
            </li>
            ))}
        </ul>
    </Flex>
  );
}