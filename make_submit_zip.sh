#!/bin/bash

rm *.zip
zip -r rwgps_ele_gsi.zip ./ -x '.*' -x 'video/**' -x 'img/org/*' -x '.git/**' -x '*.sh' -x '*.zip'
