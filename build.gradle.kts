plugins {
    base
    kotlin("jvm") version "1.7.20" apply false
}

subprojects {
    repositories {
        mavenCentral()
        maven("https://jitpack.io")
    }
}