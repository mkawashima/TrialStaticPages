shared_context 'basic models' do |object|
  shared_examples 'basic models crud' do |update_column, update_value|
    context '正しいデータを入れた場合' do
      let(:build_object) { build(object) }
      example '妥当なオブジェクトであること' do
        expect(build_object).to be_valid
      end
      example '登録できること' do
        expect(build_object.save).to be true
      end
    end
    context '既にデータがある場合' do
      let(:create_object) { create(object) }
      example '削除できること' do
        create_object.destroy
        expect(create_object.destroyed?).to be true
      end
      example '編集できること' do
        create_object[update_column] = update_value
        expect(create_object.save).to be true
      end
    end
  end
end