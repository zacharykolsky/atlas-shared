# Atlas Shared
So many people in your network go to interesting places around the world. There has to be an easier way to receive helpful and reliable travel recommendations.

Atlas Shared makes it easier to facilitate travel recommendations from within your network by building a community of shared experiences.

###  How It Works
We utilize a map-based interface for you to share your travel insights and become a thought leader in your network, while learning from your network

## Installation
```
git clone git@github.com:cpgruber/map-db.git
cd map-db
bower install
npm install
```
You will need to add a `env.js` file to the root directory, and add your own Facebook developer credentials (sign up at [Facebook for Developers](https://developers.facebook.com)):

```
module.exports = {
  facebookID: "[YOUR ID]",
  facebookSecret: "[YOUR SECRET KEY]",
  facebookCallbackURL: "http://127.0.0.1:3000/auth/facebook/callback"
};
```


## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request

## Credits

Product Manager: Zachary Kolsky
UX Team: Gregg Tourville, Naisha Silva
Web Developers: Tyler Crosse, Chase Gruber, Rachel Porter
