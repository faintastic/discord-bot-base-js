const chalk = require("chalk");

class Logger {
    getCurrentTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, "0");
        const minutes = String(now.getMinutes()).padStart(2, "0");
        const seconds = String(now.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    }

    Success(message) {
        console.log(chalk.gray(this.getCurrentTime()) + chalk.green(" [+] ") + message)
    }

    Error(message) {
        console.log(chalk.gray(this.getCurrentTime()) + chalk.red(" [-] ") + message)
    }

    Info(message) {
        console.log(chalk.gray(this.getCurrentTime()) + chalk.yellow(" [!] ") + message)
    }

    Log(message) {
        console.log(chalk.gray(this.getCurrentTime()) + chalk.yellow(" [*] ") + message)
    }
}

module.exports = new Logger();