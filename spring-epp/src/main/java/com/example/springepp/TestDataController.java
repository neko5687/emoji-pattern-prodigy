package com.example.springepp;

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
        MatrixUser creator = new MatrixUser("Admin");

        matrixUserRepository.save(creator);
        matrixRepository.save(new Matrix(
                "🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋❤️🦋️", "Hearts and Butterflies", creator, 1));
        matrixRepository.save(new Matrix(
                  "🦕🐘🦒🐘🦒🐘🦕🦒🐘🦒🐘🦒🦕🐘🦒🐘🦒🐘🦕🦒🐘🦒🐘🦒🦕", "Animal Parade", creator, 1));
        matrixRepository.save(new Matrix(
                "🥒🥒🥒🥒❤️❤️🥒🥒🥒❤️❤️🥒❤️🥒❤️❤️❤️❤️🥒❤️❤️❤️❤️❤️❤️", "Pickle Love", creator, 2));
        matrixRepository.save(new Matrix(
                "🐦❤️🐦🌳🪹🐦🐦❤️🪹🪺🐦🪺❤️🐦🥚🐦🪺🐣🥚🐦🐦🐣🐥🦉🐦", "False Spring", creator, 3));
        matrixRepository.save(new Matrix(
                "🍕🍔🌭🍟🍨🍕🍔🌭🍨🍨🍕🍨🍨🍨🍕🍨🍨🍨🍨🍨🍨🍨🍨🍨", "Food", creator, 1));
        matrixRepository.save(new Matrix(
                "🌞🌞🌞😎🏖️🌞🌞😎🏖️🍹🌞😎🏖️🍹🍹😎🏖️🍹🍹🍹🌅😎🍹🍹🤢", "Vacation", creator, 2));
        matrixRepository.save(new Matrix(
                "🥨🥨🍗🍺🍖🥨🍗🍗🍺🍖🥨🍗🍺🍺🍖🥨🍗🍺🍖🍖🥨🥨🍗🍺🍖", "Bavaria", creator, 2));
        matrixRepository.save(new Matrix(
                "🎈🎈🎈🎈🎈🎈🎈🎉🎈🎈🎈🎈🎉🎉🎈🎈🎉🎉🎉🎈🎈🎉🎉🎉🎉", "Ballon", creator, 1));
        matrixRepository.save(new Matrix(
                "😭😂😭😂😭😂😭😂😭😂😭😂😭😂😭😂😭😂😭😂😂😭😂😭😂", "Laugh and Cry", creator, 1));
        matrixRepository.save(new Matrix(
                "🚗🚗🚓🚑🚒🚗🚓🚑🚒🚗🚓🚑🚒🚗🚗🚑🚒🚗🚗🚓🚒🚗🚗🚓🚑", "TatüTata", creator, 2));
        matrixRepository.save(new Matrix(
                "🌑🌒🌓🌔🌕🌖🌗🌘🌑🌑🌒🌓🌔🌕🌖🌗🌘🌑🌑🌒🌓🌔", "Moon", creator, 1));
        matrixRepository.save(new Matrix(
                "➡️➡️➡️➡️↩️↪️⬅️⬅️⬅️⬅️➡️➡️➡️➡️↩️↪️⬅️⬅️⬅️⬅️➡️➡️➡️➡️➡️", "arrow", creator, 2));
        return "Testdata creation worked";
    }
}
