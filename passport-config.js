const bcrypt = require('bcrypt');

//passport related information
const localStrategy = require('passport-local').Strategy;
console.log(localStrategy)//순환참조 https://www.akinjide.me/2018/circular-reference-in-javascript/

function initialize(passport, getUserbyEmail, getUserById){
  console.log("INITIALIZE PASSPORT");
  const authenticateUser = async (email, password, done) => {// id, pw는 Field에서 받은 값. authenticate확인 후 done호출
    const user = getUserbyEmail(email);
    if (!user) {
      return done(null, false, { message: 'No user with this email address' });
    }

    try {
      const validPassword = await bcrypt.compare(password, user.password);//boolean
      console.log(validPassword)
      if (validPassword) {
        return done(null, user);
      } else {
        return done(null, false, { message: 'password incorrect'});
      }
    } catch(err) {
      return done(err);//done의 첫번째 인자 error
    }
  }

  passport.use(new localStrategy({ usernameField: 'email', passwordField: "password"  }, authenticateUser));//authenticateUser callback함수 받아야한다.
  // 여기서 email, password의 값은 login의 form에서 해당하는 name값이여야 합니다.
  passport.serializeUser((user, done) => {// Strategy 성공 시 호출됨
    console.log("serialize", user);   // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {// 매개변수 id는 serializeUser의 done의 인자 user.id를 받은 것
    return done(null, getUserById(id));// 여기의 getUserById(id)가 req.user가 됨
  });
}

module.exports = initialize;
