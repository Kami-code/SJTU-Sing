cmake_minimum_required(VERSION 3.4.1)

#添加子目录,将会调用子目录中的CMakeLists.txt

set(CMAKE_LIBRARY_OUTPUT_DIRECTORY ${PROJECT_SOURCE_DIR}/../libs/${ANDROID_ABI})

include_directories(src/main/cpp/)

# Build our own native library
add_library (librecord SHARED record.cpp )

# Find the Oboe package
find_package (oboe REQUIRED CONFIG)

# Specify the libraries which our native library is dependent on, including Oboe
target_link_libraries(native-lib log oboe::oboe)

