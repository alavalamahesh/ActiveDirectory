const person ={
    name:'MAHESH',
    age:'28',
    greet(){
    console.log("Welcome you to the learning session "+this.name);
    }
    };
    
    const printName = ({name}) => {   //destructure of objects
    console.log("Print name having "+name);
    }
    
    printName(person);


    const {name,age} = person //destructure of objects

    console.log("Name of person "+name+" age of the person "+age)


    //destructure of arrays

     const hobbies = ['Sports','Cooking']
    // const {a,b} = hobbies //we're tring destructing array using object
    // console.log("array of hobbies destructing in object "+a,+b);
    const [hobby1,hobby2] = hobbies 
    console.log("array of hobbies destructing in array  "+hobby1,hobby2);
    