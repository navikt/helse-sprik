import java.nio.file.Paths
private val main_class = "no.nav.helse.sprik.ApplicationKt"

private val ktor_version = "2.3.2"
private val kotlin_version = "1.8.22"
private val logback_version = "1.2.11"
private val flyway_core_version = "9.20.0"
private val postgresql_version = "42.6.0"
private val hikariCP_version = "5.0.1"
private val exposed_version = "0.41.1"
private val testcontainers_postgresql_version = "1.18.3"
private val junit_jupiter_version = "5.9.3"

plugins {
    kotlin("jvm") apply true
    id("io.ktor.plugin") version "2.3.2"
    id("org.jetbrains.kotlin.plugin.serialization") version "1.8.20"
}

application {
    mainClass.set(main_class)
}

dependencies {
    implementation("io.ktor:ktor-server-core-jvm:$ktor_version")
    implementation("io.ktor:ktor-server-netty-jvm:$ktor_version")
    implementation("ch.qos.logback:logback-classic:$logback_version")
    implementation("io.ktor:ktor-server-cors:$ktor_version")
    implementation("io.ktor:ktor-utils:$ktor_version")
    implementation("io.ktor:ktor-serialization-kotlinx-json:$ktor_version")
    implementation("io.ktor:ktor-server-content-negotiation:$ktor_version")
    implementation("io.ktor:ktor-client-content-negotiation:$ktor_version")
    implementation("org.flywaydb:flyway-core:$flyway_core_version")
    implementation("org.postgresql:postgresql:$postgresql_version")
    implementation("com.zaxxer:HikariCP:$hikariCP_version")
    implementation("org.jetbrains.exposed:exposed-core:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-jdbc:$exposed_version")
    implementation("org.jetbrains.exposed:exposed-java-time:$exposed_version")
    implementation("io.ktor:ktor-server-cio:$ktor_version")
    testImplementation("io.ktor:ktor-server-tests-jvm:$ktor_version")
    testImplementation("org.jetbrains.kotlin:kotlin-test-junit:$kotlin_version")
    testImplementation("org.testcontainers:postgresql:$testcontainers_postgresql_version")
    testImplementation("org.junit.jupiter:junit-jupiter-api:$junit_jupiter_version")
    testImplementation("org.junit.jupiter:junit-jupiter-params:$junit_jupiter_version")
    testRuntimeOnly("org.junit.jupiter:junit-jupiter-engine:$junit_jupiter_version")
}

tasks {
    test {
        useJUnitPlatform()
    }

    compileKotlin {
        kotlinOptions.jvmTarget = "17"
    }

    compileTestKotlin {
        kotlinOptions.jvmTarget = "17"
    }
    jar {
        mustRunAfter(":frontend:yarn", ":frontend:yarn_build")
        archiveBaseName.set("app")

        manifest {
            attributes["Main-Class"] = main_class
            attributes["Class-Path"] = configurations.runtimeClasspath.get().joinToString(separator = " ") {
                it.name
            }
        }
        from({ Paths.get(project(":frontend").buildDir.path) }){
            into("frontend/out")
        }
        doLast {
            configurations.runtimeClasspath.get().forEach {
                val file = File("$buildDir/libs/${it.name}")
                if (!file.exists())
                    it.copyTo(file)
            }
        }
    }
}