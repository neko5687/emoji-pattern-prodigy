package com.example.springepp;

import com.example.springepp.user.MatrixUser;
import com.example.springepp.user.MatrixUserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TestDataController {
    private MatrixUserRepository matrixUserRepository;
    private MatrixRepository matrixRepository;

    @Autowired
    public TestDataController(MatrixRepository matrixRepository, MatrixUserRepository matrixUserRepository) {
        this.matrixRepository = matrixRepository;
        this.matrixUserRepository = matrixUserRepository;
    }

    @GetMapping("/api/testdata")
    public @ResponseBody String createTestData() {
        MatrixUser creator = matrixUserRepository.findByName("Emojiteers");
        matrixRepository.save(new Matrix(
                "🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋,❤️,🦋", "Spring Love", creator, 1, "Which one has wings?"));

        matrixRepository.save(new Matrix(
                "🦕,🐘,🦒,🐘,🦒,🐘,🦕,🦒,🐘,🦒,🐘,🦒,🦕,🐘,🦒,🐘,🦒,🐘,🦕,🦒,🐘,🦒,🐘,🦒,🦕", "Animal Parade", creator, 1, "Who is slowest?"));
        matrixRepository.save(new Matrix(
                "🥒,🥒,🥒,🥒,❤️,❤️,🥒,🥒,🥒,❤️,❤️,🥒,❤️,🥒,❤️,❤️,❤️,❤️,🥒,❤️,❤️,❤️,❤️,❤️,❤️", "Pickle Love", creator, 2, "What do you always have with you?"));
        matrixRepository.save(new Matrix(
                "🍕,🍔,🌭,🍟,🍨,🍕,🍔,🌭,🍨,🍨,🍕,🍨,🍨,🍨,🍕,🍨,🍨,🍨,🍨,🍨,🍨,🍨,🍨,🍨,🍨", "Food", creator, 1, "You always need more and more!"));
        matrixRepository.save(new Matrix(
                "🌞,🌞,🌞,😎,🏖️,🌞,🌞,😎,🏖️,🍹,🌞,😎,🏖️,🍹,🍹,😎,🏖️,🍹,🍹,🍹,🌅,😎,🍹,🍹,🤢", "Vacation", creator, 2, "How do you feel after 8 cocktails?"));
        matrixRepository.save(new Matrix(
                "🥨,🥨,🍗,🍺,🍖,🥨,🍗,🍗,🍺,🍖,🥨,🍗,🍺,🍺,🍖,🥨,🍗,🍺,🍖,🍖,🥨,🥨,🍗,🍺,🍖", "Bavaria", creator, 2, "Restart Oktoberfest-day."));
        matrixRepository.save(new Matrix(
                "🎈,🎈,🎈,🎈,🎈,🎈,🎈,🎉,🎈,🎈,🎈,🎈,🎉,🎉,🎈,🎈,🎉,🎉,🎉,🎈,🎈,🎉,🎉,🎉,🎉", "Ballon", creator, 1, "More party"));
        matrixRepository.save(new Matrix(
                "😭,😂,😭,😂,😭,😂,😭,😂,😭,😂,😭,😂,😭,😂,😭,😂,😭,😂,😭,😂,😭,😂,😭,😂,😭", "Laugh and Cry", creator, 1, "No woman no ...?"));
        matrixRepository.save(new Matrix(
                "🚗,🚗,🚓,🚑,🚒,🚗,🚓,🚑,🚒,🚗,🚓,🚑,🚒,🚗,🚗,🚑,🚒,🚗,🚗,🚓,🚒,🚗,🚗,🚓,🚑", "TatüTata", creator, 2, "Who is behind police?"));
        matrixRepository.save(new Matrix(
                "🌑,🌒,🌓,🌔,🌕,🌖,🌗,🌘,🌑,🌒,🌓,🌔,🌕,🌖,🌗,🌘,🌑,🌒,🌓,🌔,🌕,🌖,🌗,🌘,🌑", "Moon", creator, 1, "Come to the dark side!"));
        matrixRepository.save(new Matrix(
                "➡️,➡️,➡️,➡️,↩️,↪️,⬅️,⬅️,⬅️,⬅️,➡️,➡️,➡️,➡️,↩️,↪️,⬅️,⬅️,⬅️,⬅️,➡️,➡️,➡️,➡️,↩️", "arrow", creator, 2, "Follow row"));

        return "Testdata creation worked";
    }
}
