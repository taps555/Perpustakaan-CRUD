let currentPage = "home";
let currentBook = null;
let books = [];

console.log(currentBook);
const main = document.querySelector("main");

const pageListMainContent = `

    <h2 class="text-2xl font-bold mb-4">Daftar Buku Perpustakaan</h2>
    <table class="min-w-full border border-gray-300">
      <thead>
        <tr>
          <th class="px-6 py-3 bg-gray-100 border-b text-left">Judul</th>
          <th class="px-6 py-3 bg-gray-100 border-b text-left">Penulis</th>
          <th class="px-6 py-3 bg-gray-100 border-b text-left">Tahun Terbit</th>
          <th class="px-6 py-3 bg-gray-100 border-b text-left">Jumlah</th>
          <th class="px-6 py-3 bg-gray-100 border-b text-center">Action</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
    
`;

const pageEditBookMainContent = `<h2 class="text-2xl font-bold mb-4">Edit Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleEditForm(event)">
</form>
`;

const pageAddBookMainContent = ` <h2 class="text-2xl font-bold mb-4">Tambah Buku</h2>

<form class="max-w-sm mx-auto" onsubmit="return handleAddForm(event)">
  <div class="mb-4">
    <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
    <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
    <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
    <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="mb-4">
    <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
    <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
  </div>
  <div class="flex justify-center">
    <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="Tambah Buku" />
  </div>
</form>
`;

async function handleClickEditButton(bookId) {
  try {
    // Ambil data buku dari server berdasarkan id, simpan hasilnya ke variabel currentBook
    // TODO: answer here
    const response = await fetch(`http://localhost:3333/books/${bookId}`, {
      method: "GET",
    });

    currentBook = await response.json();

    currentPage = "edit";
    loadPage();
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat mengambil data buku");
  }
}

async function handleClickDeleteButton(bookId) {
  try {
    // const confirmation = confirm("Apakah anda yakin ingin menghapus buku ini?");
    // if (!confirmation) {
    //   return;
    // }
    await deleteBook(bookId);
    //panggil function deleteBook dengan parameter bookId
    // TODO: answer here
    currentPage = "home";
    loadPage();
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat menghapus buku");
  }
}

async function handleEditForm(event) {
  try {
    // gunakan preventDefault untuk mencegah browser melakukan reload halaman
    // TODO: answer here
    event.preventDefault();

    let editTitle = document.getElementById("title").value;
    let editAuthor = document.getElementById("author").value;
    let editYear = document.getElementById("year").value;
    let editQuantity = document.getElementById("quantity").value;
    // Ambil data dari form, simpan ke dalam variabel book
    // bentuknya seperti ini:

    const book = {
      id: currentBook?.id,
      title: editTitle,
      author: editAuthor,
      year: editYear,
      quantity: editQuantity,
    };

    // TODO: answer here

    // panggil function editBook dengan parameter book
    await editBook(book);
    // TODO: answer here

    currentBook = null;

    currentPage = "home";
    loadPage();
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat mengubah buku");
  }
}

async function handleAddForm(event) {
  try {
    // gunakan preventDefault untuk mencegah browser melakukan reload halaman
    // TODO: answer here
    event.preventDefault();

    // const result = await handleAddForm(event);

    let title = document.getElementById("title").value;
    let author = document.getElementById("author").value;
    let year = document.getElementById("year").value;
    let quantity = document.getElementById("quantity").value;

    // Ambil data dari form, simpan ke dalam variabel book
    // bentuknya seperti ini:

    const book = {
      title: title,
      author: author,
      year: parseInt(year),
      quantity: parseInt(quantity),
    };
    books.push(book);
    // TODO: answer here

    // panggil function addBook dengan parameter book
    await addBook(book);
    // TODO: answer here

    currentPage = "home";
    loadPage();
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat menambah buku");
  }
}

function handleClickAddNav() {
  currentPage = "add";
  loadPage();
}

// add event listener click tag a didalam li dengan function handleClickAddNav
const navLinks = document.querySelectorAll("li a");
navLinks.forEach((navLink) => {
  // TODO: answer here
});

function generateRows(books) {
  let rows = "";
  if (books.length === 0) {
    rows = `<tr>
   <td colspan="6" class="px-6 py-4 border-b text-center">Tidak ada buku yang ditemukan</td>
</tr>`;
  } else {
    //   looping books, untuk setiap book, buat row seperti ini

    books.forEach((book) => {
      rows += `
      <tr class="book-item">
        <td class="px-6 py-4 border-b">${book.title}</td>
        <td class="px-6 py-4 border-b">${book.author}</td>
        <td class="px-6 py-4 border-b">${book.year}</td>
        <td class="px-6 py-4 border-b">${book.quantity}</td>
        <td class="px-6 py-4 border-b text-center">
          <button
            class="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onclick="handleClickEditButton(${book.id})"
          >
            Edit
          </button>
          <button
            class="inline-block bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onclick="handleClickDeleteButton(${book.id})")"
          >
            Hapus
          </button>
        </td>
      </tr>`;
    });
    console.log(books);

    //   Jangan lupa untuk ganti BookId dengan id dari book yang sedang di looping
    //   simpan row yang dibuat ke variabel rows
    // */
    // // TODO: answer here
  }
  return rows;
}

function generateEditFormInput() {
  return ` 
<form class="max-w-sm mx-auto" onsubmit="return handleEditForm(event)">
  <div class="mb-4">
  <label for="title" class="block text-gray-700 font-semibold mb-2">Judul Buku</label>
  <input required type="text" id="title" name="title" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.title}">
</div>
<div class="mb-4">
  <label for="author" class="block text-gray-700 font-semibold mb-2">Penulis Buku</label>
  <input required type="text" id="author" name="author" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.author}">
</div>
<div class="mb-4">
  <label for="year" class="block text-gray-700 font-semibold mb-2">Tahun Terbit</label>
  <input required type="number" id="year" name="year" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.year}">
</div>
<div class="mb-4">
  <label for="quantity" class="block text-gray-700 font-semibold mb-2">Jumlah Stok</label>
  <input required type="number" id="quantity" name="quantity" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" value="${currentBook?.quantity}">
</div>
<div class="flex justify-center">
  <input type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" value="simpan" />
</div> </form>`;
}

async function loadPage() {
  // if (currentPage === "add") {
  //   main.innerHTML = pageAddBookMainContent;
  //   updateURL("add");
  try {
    // TODO: answer here
    switch (currentPage) {
      case "home":
        const response = await fetch(`http://localhost:3333/books`); // Ganti dengan URL API Anda
        const data = await response.json();
        books = data;
        main.innerHTML = pageListMainContent;
        fetchBooks().then(() => {
          const tableBody = main.querySelector("tbody");
          tableBody.innerHTML = generateRows(books);
        });

        updateURL("home");

        /*
        panggil function generateRows dengan parameter books dan simpan hasilnya ke variabel rows
        kemudian isi innerHTML dari tableBody dengan rows
      */
        // TODO: answer here

        break;
      case "edit":
        main.innerHTML = pageEditBookMainContent;
        const form = main.querySelector("form");
        form.innerHTML = generateEditFormInput();
        updateURL("edit");

        /*
        panggil function generateEditFormInput dan simpan hasilnya ke variabel formInput
        kemudian isi innerHTML dari form dengan formInput
      */
        // TODO: answer here
        break;

      case "add":
        main.innerHTML = pageAddBookMainContent;
        updateURL("add");
        break;
    }
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat memuat halaman");
  }
}

async function fetchBooks() {
  try {
    const response = await fetch("http://localhost:3333/books", {
      method: "GET",
    });
    const resp = response.json();
    resp = books;
    return resp;

    /* 
      fetch data buku dari http://localhost:3333/books
      simpan hasilnya ke variabel global books
    */
    // TODO: answer here
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat mengambil data buku");
  }
}

async function addBook(book) {
  try {
    const response = await fetch("http://localhost:3333/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        year: book.year,
        quantity: book.quantity,
      }),
    });

    const creates = await response.json();
    return creates;
    /* 
      tambahkan buku baru ke http://localhost:3333/books dengan method POST
      body yang dikirim adalah book yang dikirimkan sebagai parameter function
    */
    // TODO: answer here
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat menambah buku");
  }
}

async function editBook(book) {
  try {
    /* 
      ubah buku yang ada di http://localhost:3333/books/:id dengan method PUT
      body yang dikirim adalah book yang dikirimkan sebagai parameter function
    */
    const edit = await fetch("http://localhost:3333/books/" + book.id + "", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: book.title,
        author: book.author,
        year: book.year,
        quantity: book.quantity,
      }),
    });

    const editBook = await edit.json();
    return editBook;

    // TODO: answer here
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat mengubah buku");
  }
}

async function deleteBook(bookId) {
  try {
    /* 
      hapus buku yang ada di http://localhost:3333/books/:id dengan method DELETE
      
      id buku yang akan dihapus dikirimkan sebagai parameter function
    */
    const response = await fetch(`http://localhost:3333/books/${bookId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const deleteBook = await response.json();
    return deleteBook;

    // TODO: answer here
  } catch (error) {
    console.log(error);
    console.log("Terjadi kesalahan saat menghapus buku");
  }
}

loadPage();
