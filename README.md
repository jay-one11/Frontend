R# React.js 시작하기

### 프로젝트 생성하기

1. npx create-react-app "프로젝트 명"

   ex) `npx create-react-app my-app `

2. node.js 설치하기

   `node -v` 를 통해서 확인 가능

3. `npm run start` 를 통해서 실행 가능

### React 문법 !

1. ### function
   `function(변수){}` 와 `()=>{}`은 같다.
   ```
   function App(){
       return(
           <div>Hello World</div>
       );
   }
   ```
   - ### useState
   ```
    const [counter, setValue ] = React.useState(0);
    const btnClick =() =>{
        setValue((prev)=>prev+1);
    }
    ...
    <button onClick={btnClick}> Count Up! </button>
   ```
   - ### useEffect

```
  useEffect(()=>{
      if(keyword !== "" && keyword > 5){
          console.log("search for " + keyword);
      }
  },[keyword]);
```

    변수가 변경될 때마다 해당 변수값을 감시하며 함수 실행. if문을 통해서 내부 제어를 추가적으로 할 수 있음.
    모든 컴포넌트가 데이터 재 로딩 시마다 로딩되는 것을 막기 위함.

2. ### Variable

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

3. ### Rendering

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

4. ### Props
   - Props 는 함수나 다른 컴포넌트에 파라미터를 전달해주는 역할을 수행한다
   - 보낼떄의 변수값 = 받을때 변수값을 반드시 지켜주어야 한다

```
  보낼 때
  <Movie
      coverImg ={image}
      title ={movie_title}
      summary = {summary}
  />

  받을 떄
  function Movie({coverImg, title, summary}){
      return (
          <div>{title}</div>
          <img src={coverImg} />
          <div>{summary}</div>
      );
  }
```

- Prop 의 타입을 지정하기 위해서 PorpTypes를 사용한다.
  - `import PropTypes from "prop-types";`
  ```
  Movie.propTypes = {
  id: PropTypes.number.isRequired,
  coverImg: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  summary: PropTypes.string.isRequired,
  genres: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  ```

1. ### map
   - 배열.map() 을 사용하게 되면 배열 각 원소에서 괄호 내에 해당되는 가공 결과로 변환하게 됨.
   - 이를 이용하여 Pasing으로 받아온 json 결과를 화면에 목록 형태로 출력하기 유용함

```
    movies.map((cur)=>(
        <Movie
            coverImg={cur.medium_cover_image}
            title={cur.title}
            summary={cur.summary}
            genres={cur.genres}
            id={cur.id}
        >
    ))

    <select>
          {coins.map((coin) => (
            <option key={coin.id}>
              {coin.name} ({coin.symbol}) : ${coin.quotes.USD.price}
            </option>
          ))}
    </select>

```

6. ### React-Router
   - Rotue 기능을 통해서 다른 페이지로 이동할 때 사용
   - `npm i react-router-dom@5.3.0` 로 우선 설치
   - 보내는 페이지는 `import { BrowserRouter as Router, Switch, Route } from "react-router-dom";`
   - 받는 페이지는 `import { Link } from "react-router-dom"; {}`
   - `<Link to="/">` 를 통해서 사용
     - Link의 장점 : 페이지를 새로고침하지 않아서 빠름

```
보내는 페이지

<Router>
    <Switch>
        // url은 /movie/{id} 로 보내진다.
        // 받은 페이지에서 id 변수를 사용가능
        <Rotue path="/movie:id">
            <PageA />
        </Route>
        <Rotue path="/">
            <Home />
        </Route>
    </Switch>
</Router>

받는 페이지
import {useParams} from "react-router-dom";

const {id} = useParams();
 <h2>
    <Link to{`/movie/${id}`}>{title}</Link>
 </h2>
```

7. ### publishing
   - `npm i gh-pages` 설치
   - `pakage.json`에 run build 가 있는 지 확인 후
   - 터미널에 `npm run build`
     - 코드를 압축, 최적화된 production code로 제작
   - git hub에 push
     - package.json 맨 아래에 `"homepage" : "https://jay-one11.github.io/my-id/my-repo"` 입력
     - package.json의 scripts 내부에 `"deploy": "gh-pages -d build"` , `"predeploy": "npm run build"`추가
     - 터미널에 `npm run deploy` 수행후 3~4분 후 url 접속

---

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

1. App

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
