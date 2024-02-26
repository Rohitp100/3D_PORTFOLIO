const Projects = () => {
  return (
    <div style={{
      background: 'linear-gradient(to right, #f4c4f3, #fc67fa)',
      width: '100%',
      minHeight: '100vh',
    }}>
      <section className='intro max-container' style={{paddingTop:'100px',paddingBottom:'30px'}}>
      <p style={{fontSize: '48px', paddingBottom:'30px'}}>
          <span className='text-rose-700'>My</span> <span className='name' style={{ fontFamily: 'Arial, sans-serif' }}>Projects</span>.
        </p>
        <p style={{fontSize: '24px',paddingBottom:'30px'}} className='text-rose-900'>
     I've embarked on numerous projects throughout the years, but these are some of the latest ones. 
     </p>
     <p style={{fontSize: '36px', paddingBottom:'30px'}} className='text-rose-700'>
      ECOMMERCE WEBSITE - Ongoing
     </p>
     <p style={{fontSize: '24px',paddingBottom:'30px'}} className='text-rose-900'>
      You can use it as a customer or a seller. As a customer you would be able to customize the appearance of your products add them in your wishlist or cart. Seller would be able to put the products quantity and pricing. 
     </p>
     <p style={{fontSize: '36px', paddingBottom:'30px'}} className='text-rose-700'>
     <a href="https://github.com/Rohitp100/AI_POWERED_3D-WEBSITE" style={{textDecoration: 'none', color: 'inherit'}}>AI-POWERED 3D WEBSITE</a>
     </p>
     <p style={{fontSize: '24px',paddingBottom:'30px'}} className='text-rose-900'>
     You would be able to customize different sections of your PS5. You can change colour or apply skin of your choice using AI or the image files you already have. 
     </p>

     <p style={{fontSize: '36px', paddingBottom:'30px'}} className='text-rose-700'>
     <a href="https://github.com/Rohitp100/SUSHI_WEBSITE" style={{textDecoration: 'none', color: 'inherit'}}>SUSHI WEBSITE</a>
     </p>
     <p style={{fontSize: '24px',paddingBottom:'30px'}} className='text-rose-900'>
       Its a fully responsive HTML & CSS website with animation.
     </p>

     <p style={{fontSize: '36px', paddingBottom:'30px'}} className='text-rose-700'>
     <a href="https://github.com/Rohitp100/BOOK_STORE" style={{textDecoration: 'none', color: 'inherit'}}>BOOK STORE</a>
     </p>
     <p style={{fontSize: '24px',paddingBottom:'30px'}} className='text-rose-900'>
      Its a MERN stack website with CRUD and Router.
     </p>
      </section>

    </div>
  )
}

export default Projects
