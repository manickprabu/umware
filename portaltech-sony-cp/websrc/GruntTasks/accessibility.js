module.exports = function accessibility(grunt) {
    grunt.loadNpmTasks('grunt-accessibility');

    return {
        options: {
            accessibilityLevel: 'WCAG2A'
        },
        partial: {
            src: 'client/app/**/*.html',
            options: {
                ignore: [
                    // Ignores the missing title element, which we do not need for partials
                    'WCAG2A.Principle2.Guideline2_4.2_4_2.H25.1.NoTitleEl',

                    // Ignores the missing lang/xml:lang attribute, which should be contained in
                    // the index.html HTML
                    'WCAG2A.Principle3.Guideline3_1.3_1_1.H57.2',

                    // Ignores heading structure as partials will not contain H1->H6 on their own.
                    'WCAG2A.Principle1.Guideline1_3.1_3_1_A.G141'
                ]
            }
        },
        index: {
            src: ['client/index.html'],
            options: {
                ignore: [
                    // Omits the notice to check that the title element describes the document.
                    'WCAG2A.Principle2.Guideline2_4.2_4_2.H25.2'
                ]
            }
        }
    };
};
