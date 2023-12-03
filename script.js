tailwind.config = {
    theme: {
        extend: {
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
            },
            animation: {
                'infinite-scroll': 'infinite-scroll 25s linear infinite',
            },
            keyframes: {
                'infinite-scroll': {
                    from: { transform: 'translateX(0)' },
                    to: { transform: 'translateX(-50%)' },
                }
            }                    
        },
    },
};




const btn = document.querySelector("#btn");

btn.addEventListener("click",()=>{
    document.querySelector("#btn_i").style.display = "initial";
})