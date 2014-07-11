MODULE			:= terrier
EXPORT 			:= $(MODULE)
BUILD_DIR 		:= build
BUNDLE 			:= $(BUILD_DIR)/$(MODULE).js
BUNDLE_MIN		:= $(BUILD_DIR)/$(MODULE).min.js
TEST_BUNDLE 	:= test/bundle.js
ENTRY			:= index.js
BINS 			:= ./node_modules/.bin

#
#

SRC := $(ENTRY)

.PHONY: all bundle test_bundle clean info watch

all: bundle test_bundle

bundle: $(BUNDLE) $(BUNDLE_MIN)

test_bundle: $(TEST_BUNDLE)

clean:
	rm -f $(BUNDLE)
	rm -f $(DEMO_BUNDLE)

info:
	@echo "Source:" $(SRC)

$(BUILD_DIR):
	mkdir -p $(BUILD_DIR)

$(BUNDLE): $(BUILD_DIR) $(SRC)
	browserify -s $(EXPORT) $(ENTRY) > $@

$(BUNDLE_MIN): $(BUNDLE)
	$(BINS)/uglifyjs < $(BUNDLE) > $@

$(TEST_BUNDLE): test/all.js $(SRC)
	browserify $< > $@