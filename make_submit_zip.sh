#!/bin/bash

rm *.zip
zip -r rwgps_ele_gsi.zip ./ -x 'video/**' -x 'img/org/*' -x '.git/**' -x '*.sh' -x '*.zip'
