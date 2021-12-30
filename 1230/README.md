# React.js 시작하기

### 프로젝트 생성하기

1. npx create-react-app "프로젝트 명"

   ex) `npx create-react-app my-app `

2. node.js 설치하기

   `node -v` 를 통해서 확인 가능

3. `npm run start` 를 통해서 실행 가능

### React 문법 !

1. 함수
   `function(변수){}` 와 `()=>{}`은 같다.
   ```
   function App(){
       return(
           <div>Hello World</div>
       );
   }
   ```
   - useState
   ```
    const [counter, setValue ] = React.useState(0);
    const btnClick =() =>{
        setValue((prev)=>prev+1);
    }
    ...
    <button onClick={btnClick}> Count Up! </button>
   ```
   - useEffect

```
  useEffect(()=>{
      if(keyword !== "" && keyword > 5){
          console.log("search for " + keyword);
      }
  },[keyword]);
```

    변수가 변경될 때마다 해당 변수값을 감시하며 함수 실행. if문을 통해서 내부 제어를 추가적으로 할 수 있음.
    모든 컴포넌트가 데이터 재 로딩 시마다 로딩되는 것을 막기 위함.

2. 변수
   const를 활용해서 전역변수와 같은 기능 가능

   ```
   const [변수,변수설정함수] = React.useState(초기값)
   const onClick = () =>{
       변수설정함수(변경값);
   }
   ```

   ex)

   ```
   const onClick = () =>{
       setValue((prev)=>prev+1);
   }
   ```

3. 랜더링
   1. 첫 랜더링하기 (root)
   ```
      ReactDOM.render(document.getElementById("root"));
   ```
   1. 다중 랜더링 하기 (Component)
   ```
       ReactDOM.render(
           <React.StrictMode>
               <App />
               <Button />
           </React.StrictMode>
           getElementById("root");
       );
   ```
   단 이때, Component의 첫 글자는 항상 대문자로 쓴다.

복합적 구현하기 1. Hello Function

```
     function Hello(){
         function destroyFn(){
             console.log("destroyed :<);
         }
         function CreateFn(){
             console.log("Created :>);
             return destroyFn;
             // Create로 생긴 Component가 사라질 때 출력된다.

         }
     }
     useEffect(createFn, []);
     // 처음 실행할 때 한번만 실행된다.
     return <h1>Hello</h1>
```

2. App

```
fucntion App(){
    const[counter, setValue] = React.useState(0);
    const[keyword, setKeyword] = React.useState("");
    const onChange = (prev)=>{
        setKeyword(prev.target.value);
        // prev.target.value == input에 넣은 value값
    }
    const onClick = ()=>{
        setValue((prev)=>prev+1);
    }
    useEffect (()=>{
        console.log("count is :" + counter)
    },[counter]);
    useEffect(()=>{
        if(Keyword !== "" && Keyword >5){
        console.log("keyword is : "+ Keyword);
        }
    },[Keyword])

    return (
        <div>
            <input
                value = {keyword}
                onChange ={onChange}
                type = "text"
                placeholder = "search here"
                />
        </div>
        <div>
            {showing ? <Hello /> : null}
            <button onClick= {oppositeShow}>{showing? show : hide}</button>
        </div>
        <h1 className={styles.css}>{counter}</h1>
        <button onClick={onClick}> click me </button>
    )
}

```
