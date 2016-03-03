#  Back To Top React Component

[![Build status][travis-image]][travis-url]

A react component to perform a "back to top" action

##  Installation

npm install --save react-back2top

##  Usage

Import the relevant Back2Top component and use it, you can find more on the examples folder of the project

```javascript
import React from 'react';
import Back2Top from 'react-back2top';
import {FloatingActionButton} from 'material-ui';
import UpIcon from 'material-ui/lib/svg-icons/navigation/arrow-upward';

class Demo extends React.Component {
     render() {
        return (
            <div>
            
                <h3>
                  Scroll down for the button to appear
                </h3>
                
                <Back2Top>
                  <FloatingActionButton>
                      <UpIcon/>
                  </FloatingActionButton>
                </Back2Top>
                
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis consectetur turpis in arcu
                  consectetur, a mollis erat rhoncus. Suspendisse quam turpis, cursus et sapien dignissim, ornare
                  suscipit lectus. Ut elementum felis ac magna fringilla, a semper lacus commodo. Vivamus et vehicula
                  orci. Pellentesque porta tincidunt arcu, a consectetur risus maximus in. Aliquam at justo molestie,
                  mattis nibh in, varius neque. Quisque ac tellus egestas, malesuada tortor ut, luctus dolor. Sed
                  facilisis mauris quis fringilla pellentesque. Curabitur ullamcorper ut quam vel commodo. In
                  tincidunt placerat tempus. Morbi nisi ligula, tristique in lorem quis, blandit iaculis libero. Duis
                  sodales, purus eget pretium suscipit, massa lorem lobortis augue, in porta sem felis at lacus.
                  Praesent ut condimentum ex.
                </p>
                
                ....
                
            </div>

        )
     }
}

```

##  Example

The project includes a webpack server for running the examples, just run:

```sh
git clone https://github.com/tbolis/react-back2top.git
npm install
npm start
```

##  Features

TBD

## Issues

See https://github.com/tbolis/react-back2top/issues

## Changelog

See https://github.com/tbolis/react-back2top/blob/master/CHANGELOG.md

##  License

MIT, do remember to add a reference if you find it useful :)

[travis-image]: https://img.shields.io/travis/tbolis/react-back2top.svg?style=flat
[travis-url]: https://travis-ci.org/tbolis/react-back2top